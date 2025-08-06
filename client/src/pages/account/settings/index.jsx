import { useEffect, useState } from "react";
import { CheckIcon, PencilSimpleLineIcon } from "@phosphor-icons/react";
import Button from "@/components/shared/button";
import Input from "@/components/shared/input";
import api from "@/api";

import "./account-settings.css";
import useAuth from "@/hooks/use-auth";

function getInitialForm(user) {
    return {
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        currentPassword: "",
        newPassword: "",
        repeatNewPassword: "",
    };
}

export default function AccountSettingsPage() {
    const { user, token, isLoggedIn, isLoading, signIn } = useAuth();

    const [form, setForm] = useState(getInitialForm(user));
    const [isEditingAccount, setIsEditingAccount] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [savingAccount, setSavingAccount] = useState(false);
    const [savingPassword, setSavingPassword] = useState(false);

    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // Reset form when user changes (from hook)
    useEffect(() => {
        setForm(getInitialForm(user));
    }, [user]);

    const fetchUser = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await api.get(`customer/user/${user.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res?.data?.payload) {
                // Update Redux store so global user is fresh
                signIn({ ...res.data.payload, token });
                // Update form locally
                setForm(getInitialForm(res.data.payload));
                setError("");
            } else {
                setError("Failed to load user data.");
            }
        } catch {
            setError("Failed to load user data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!isLoggedIn || !token || !user?.id) return;
        fetchUser();
    }, [isLoggedIn, token]);

    const handleChange = e => {
        const { id, value } = e.target;
        const keyMap = {
            "current-password": "currentPassword",
            "new-password": "newPassword",
            "repeat-new-password": "repeatNewPassword",
        };
        const key = keyMap[id] || id;
        setForm(prev => ({ ...prev, [key]: value }));
    };

    const resetPasswordFields = () => {
        setForm(prev => ({
            ...prev,
            currentPassword: "",
            newPassword: "",
            repeatNewPassword: "",
        }));
    };

    const handleCancelAccountEdit = () => {
        setIsEditingAccount(false);
        setForm(getInitialForm(user));
        setError("");
        setSuccessMessage("");
    };

    const handleCancelPasswordChange = () => {
        setIsChangingPassword(false);
        resetPasswordFields();
        setError("");
        setSuccessMessage("");
    };

    const saveAccount = async () => {
        if (!isEditingAccount) return;
        setError("");
        setSuccessMessage("");
        setSavingAccount(true);
        setLoading(true);

        try {
            const payload = {
                name: form.name,
                email: form.email,
                phone: form.phone,
            };

            const res = await api.put(`customer/account/edit`, payload, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res?.data?.payload) {
                // Update redux auth user with fresh data + token
                signIn({ ...res.data.payload, token });
                setForm(getInitialForm(res.data.payload));
                setSuccessMessage("Account updated successfully.");
                setIsEditingAccount(false);
            } else {
                setError("Failed to update account.");
            }
        } catch (err) {
            setError(
                err?.response?.data?.message || "Failed to update account.",
            );
        } finally {
            setSavingAccount(false);
            setLoading(false);
        }
    };

    const changePassword = async () => {
        if (!isChangingPassword) return;
        setError("");
        setSuccessMessage("");

        if (!form.currentPassword) {
            setError("Current password is required.");
            return;
        }
        if (!form.newPassword || !form.repeatNewPassword) {
            setError("Please enter and confirm your new password.");
            return;
        }
        if (form.newPassword !== form.repeatNewPassword) {
            setError("New passwords do not match.");
            return;
        }

        setSavingPassword(true);
        setLoading(true);
        try {
            const payload = {
                current_password: form.currentPassword,
                new_password: form.newPassword,
                new_password_confirmation: form.repeatNewPassword,
            };
            const res = await api.put(`customer/account/edit`, payload, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res?.data?.payload) {
                signIn({ ...res.data.payload, token });
                setSuccessMessage("Password changed successfully.");
                setIsChangingPassword(false);
                resetPasswordFields();
            } else {
                setError("Failed to change password.");
            }
        } catch (err) {
            setError(
                err?.response?.data?.message || "Failed to change password.",
            );
        } finally {
            setSavingPassword(false);
            setLoading(false);
        }
    };

    if (isLoading) {
        // Show loading placeholder while auth initializes
        return <div>Loading...</div>;
    }

    if (!isLoggedIn) {
        // Redirect or show login prompt if user not logged in
        return <div>Please log in to access account settings.</div>;
    }

    return (
        <div className="account-settings">
            {error && <div className="error-message">{error}</div>}
            {successMessage && (
                <div className="success-message">{successMessage}</div>
            )}

            {/* Account Info Section */}
            <section className="account-settings__section flex-1">
                <h2 className="fs-h2">Account Information</h2>

                <div className="d-flex flex-col gap-y-4">
                    {!isEditingAccount && (
                        <button
                            type="button"
                            className="text-gray-700 fs-button d-inline-flex items-center gap-1"
                            onClick={() => setIsEditingAccount(true)}
                            disabled={loading}
                        >
                            <PencilSimpleLineIcon size={24} weight="bold" />
                            Edit account info
                        </button>
                    )}

                    <Input
                        label="Full Name"
                        id="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        disabled={!isEditingAccount || loading}
                    />
                    <Input
                        label="Email Address"
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        disabled={!isEditingAccount || loading}
                    />
                    <Input
                        label="Phone Number"
                        id="phone"
                        type="text"
                        value={form.phone}
                        onChange={handleChange}
                        disabled={!isEditingAccount || loading}
                    />

                    {isEditingAccount && (
                        <div className="d-flex items-center gap-3 self-end">
                            <Button
                                variant="outlined"
                                color="gray"
                                onClick={handleCancelAccountEdit}
                                disabled={savingAccount}
                            >
                                Cancel
                            </Button>
                            <Button
                                color="brand"
                                className="d-inline-flex item-center gap-2"
                                onClick={
                                    savingAccount ? undefined : saveAccount
                                }
                                loading={savingAccount || loading}
                            >
                                Save Changes
                                <CheckIcon size={18} />
                            </Button>
                        </div>
                    )}
                </div>
            </section>

            {/* Password Section */}
            <section className="account-settings__section flex-1">
                <h2 className="fs-h2">Password</h2>
                <div className="d-flex flex-col gap-y-4">
                    {!isChangingPassword && (
                        <button
                            type="button"
                            className="text-gray-700 fs-button d-inline-flex items-center gap-1"
                            onClick={() => setIsChangingPassword(true)}
                            disabled={loading}
                        >
                            <PencilSimpleLineIcon size={24} weight="bold" />
                            Change password
                        </button>
                    )}

                    <Input
                        label="Current Password"
                        id="current-password"
                        type="password"
                        value={form.currentPassword}
                        onChange={handleChange}
                        withPasswordToggle
                        disabled={!isChangingPassword || loading}
                    />

                    {isChangingPassword && (
                        <>
                            <Input
                                label="New Password"
                                id="new-password"
                                type="password"
                                value={form.newPassword}
                                onChange={handleChange}
                                withPasswordToggle
                                disabled={loading}
                            />
                            <Input
                                label="Repeat New Password"
                                id="repeat-new-password"
                                type="password"
                                value={form.repeatNewPassword}
                                onChange={handleChange}
                                withPasswordToggle
                                disabled={loading}
                            />
                            <div className="d-flex items-center gap-3 self-end">
                                <Button
                                    variant="outlined"
                                    color="gray"
                                    onClick={handleCancelPasswordChange}
                                    disabled={savingPassword}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    color="brand"
                                    className="d-inline-flex item-center gap-2"
                                    onClick={
                                        savingPassword
                                            ? undefined
                                            : changePassword
                                    }
                                    loading={savingPassword || loading}
                                    disabled={
                                        savingPassword ||
                                        !form.currentPassword ||
                                        !form.newPassword ||
                                        !form.repeatNewPassword
                                    }
                                >
                                    Change Password
                                    <CheckIcon size={18} />
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </section>
        </div>
    );
}
