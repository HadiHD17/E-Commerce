import { useEffect, useState } from "react";
import { CheckIcon, PencilSimpleLineIcon } from "@phosphor-icons/react";
import Button from "@/components/shared/button";
import Input from "@/components/shared/input";
import api from "@/api";
import "./account-settings.css";

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
    const [user, setUser] = useState(null);
    const [form, setForm] = useState(getInitialForm(null));

    const [isEditingAccount, setIsEditingAccount] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [savingAccount, setSavingAccount] = useState(false);
    const [savingPassword, setSavingPassword] = useState(false);

    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const token = localStorage.getItem("auth-token");

    const getuser = () => {
        try {
            const storedUser = localStorage.getItem("auth-user");
            if (!storedUser) return;

            const parsedUser = JSON.parse(storedUser);
            const userId = parsedUser.id;
            if (!userId) return;

            setLoading(true);
            setError("");

            api.get(`customer/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(res => {
                    if (res?.data?.payload) {
                        setUser(res.data.payload);
                        setForm(getInitialForm(res.data.payload));
                        setError("");
                    } else {
                        setError("Failed to load user data.");
                    }
                })
                .catch(() => {
                    setError("Failed to load user data.");
                })
                .finally(() => {
                    setLoading(false);
                });
        } catch (err) {
            setError("Failed to parse user data.");
        }
    };

    useEffect(() => {
        getuser();
    }, []);

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
        if (user) {
            setForm(getInitialForm(user));
        }
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
                setUser(res.data.payload);
                setForm(getInitialForm(res.data.payload));
                localStorage.setItem(
                    "auth-user",
                    JSON.stringify(res.data.payload),
                );
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
            const token = localStorage.getItem("auth-token");
            const payload = {
                current_password: form.currentPassword,
                new_password: form.newPassword,
                new_password_confirmation: form.repeatNewPassword,
            };
            const res = await api.put(`customer/account/edit`, payload, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res?.data?.payload) {
                setUser(res.data.payload);
                localStorage.setItem(
                    "auth-user",
                    JSON.stringify(res.data.payload),
                );
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

    return (
        <div className="account-settings">
            {/* Show error / success messages */}
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
