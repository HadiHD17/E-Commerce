import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CheckIcon, PencilSimpleLineIcon } from "@phosphor-icons/react";
import Button from "@/components/shared/button";
import Input from "@/components/shared/input";
import { userSlice } from "@/store/slices/user-slice";
import api from "@/api";
import "./account-settings.css";

const { setUser, setLoading, setError, setSuccessMessage, clearMessages } =
    userSlice.actions;

function getInitialForm() {
    try {
        const storedUser = localStorage.getItem("auth-user");
        if (storedUser) {
            const parsed = JSON.parse(storedUser);
            return {
                name: parsed.name || "",
                email: parsed.email || "",
                phone: parsed.phone || "",
                currentPassword: "",
                newPassword: "",
                repeatNewPassword: "",
            };
        }
    } catch {}
    return {
        name: "",
        email: "",
        phone: "",
        currentPassword: "",
        newPassword: "",
        repeatNewPassword: "",
    };
}

export default function AccountSettingsPage() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.data);
    const globalLoading = useSelector(state => state.user.loading);
    const error = useSelector(state => state.user.error);
    const successMessage = useSelector(state => state.user.successMessage);

    const [isEditingAccount, setIsEditingAccount] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);

    const [savingAccount, setSavingAccount] = useState(false);
    const [savingPassword, setSavingPassword] = useState(false);

    const [form, setForm] = useState(getInitialForm);

    useEffect(() => {
        if (!user) return;
        setForm(prev => ({
            ...prev,
            name: user.name || "",
            email: user.email || "",
            phone: user.phone || "",
        }));
    }, [user]);

    useEffect(() => {
        return () => dispatch(clearMessages());
    }, [dispatch]);

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
        dispatch(clearMessages());
        if (user) {
            setForm(prev => ({
                ...prev,
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
            }));
        }
    };

    const handleCancelPasswordChange = () => {
        setIsChangingPassword(false);
        dispatch(clearMessages());
        resetPasswordFields();
    };

    const accountUnchanged =
        !!user &&
        form.name === (user.name || "") &&
        form.email === (user.email || "") &&
        form.phone === (user.phone || "");

    const saveAccount = async () => {
        if (!isEditingAccount) return;
        dispatch(clearMessages());
        setSavingAccount(true);
        dispatch(setLoading(true));
        try {
            const token = localStorage.getItem("auth-token");
            const payload = {
                name: form.name,
                email: form.email,
                phone: form.phone,
            };
            const res = await api.put("customer/account/edit", payload, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res?.data?.payload) {
                const fresh = res.data.payload;
                dispatch(setUser(fresh));
                localStorage.setItem("auth-user", JSON.stringify(fresh));
            }
            dispatch(setSuccessMessage("Account updated successfully."));
            setIsEditingAccount(false);
        } catch (err) {
            dispatch(
                setError(
                    err?.response?.data?.message || "Failed to update account.",
                ),
            );
        } finally {
            setSavingAccount(false);
            dispatch(setLoading(false));
        }
    };

    const changePassword = async () => {
        if (!isChangingPassword) return;
        dispatch(clearMessages());

        if (!form.currentPassword) {
            dispatch(setError("Current password is required."));
            return;
        }
        if (!form.newPassword || !form.repeatNewPassword) {
            dispatch(setError("Please enter and confirm your new password."));
            return;
        }
        if (form.newPassword !== form.repeatNewPassword) {
            dispatch(setError("New passwords do not match."));
            return;
        }

        setSavingPassword(true);
        dispatch(setLoading(true));
        try {
            const token = localStorage.getItem("auth-token");
            const payload = {
                current_password: form.currentPassword,
                new_password: form.newPassword,
                new_password_confirmation: form.repeatNewPassword,
            };
            const res = await api.put("customer/account/edit", payload, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res?.data?.payload) {
                const fresh = res.data.payload;
                dispatch(setUser(fresh));
                localStorage.setItem("auth-user", JSON.stringify(fresh));
            }
            dispatch(setSuccessMessage("Password changed successfully."));
            setIsChangingPassword(false);
            resetPasswordFields();
        } catch (err) {
            dispatch(
                setError(
                    err?.response?.data?.message ||
                        "Failed to change password.",
                ),
            );
        } finally {
            setSavingPassword(false);
            dispatch(setLoading(false));
        }
    };

    return (
        <div className="account-settings">
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
                        disabled={!isEditingAccount}
                    />
                    <Input
                        label="Email Address"
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        disabled={!isEditingAccount}
                    />
                    <Input
                        label="Phone Number"
                        id="phone"
                        type="text"
                        value={form.phone}
                        onChange={handleChange}
                        disabled={!isEditingAccount}
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
                                loading={savingAccount || globalLoading}
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
                        disabled={!isChangingPassword}
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
                            />
                            <Input
                                label="Repeat New Password"
                                id="repeat-new-password"
                                type="password"
                                value={form.repeatNewPassword}
                                onChange={handleChange}
                                withPasswordToggle
                            />
                            <div className="d-flex items-center gap-3 self-end">
                                <Button
                                    variant="outlined"
                                    color="gray"
                                    onClick={handleCancelPasswordChange}
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
                                    loading={savingPassword || globalLoading}
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
