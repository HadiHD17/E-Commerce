import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CheckIcon, PencilSimpleLineIcon } from "@phosphor-icons/react";
import Button from "@/components/shared/button";
import Input from "@/components/shared/input";
import { userSlice } from "@/store/slices/userslice";
import api from "@/api";
import "./account-settings.css";

const { setUser, setLoading, setError, setSuccessMessage, clearMessages } =
    userSlice.actions;

export default function AccountSettingsPage() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.data);
    const loading = useSelector(state => state.users.loading);
    const error = useSelector(state => state.users.error);
    const successMessage = useSelector(state => state.users.successMessage);

    const [isEditingAccount, setIsEditingAccount] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        currentPassword: "",
        newPassword: "",
        repeatNewPassword: "",
    });

    const token = localStorage.getItem("auth-token");

    useEffect(() => {
        const storedUser = localStorage.getItem("auth-user");
        if (storedUser) {
            try {
                dispatch(setUser(JSON.parse(storedUser)));
            } catch (err) {
                console.error("Invalid user data in localStorage:", err);
            }
        }
    }, []);

    useEffect(() => {
        if (user) {
            setForm(prev => ({
                ...prev,
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
            }));
        }
    }, [user]);

    const handleChange = e => {
        const { id, value } = e.target;
        const keyMap = {
            "current-password": "currentPassword",
            "new-password": "newPassword",
            "repeat-new-password": "repeatNewPassword",
        };
        const key = keyMap[id] || id;

        setForm(prev => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSave = async () => {
        dispatch(clearMessages());

        if (isChangingPassword) {
            if (form.newPassword !== form.repeatNewPassword) {
                dispatch(setError("New passwords do not match."));
                return;
            }
            if (!form.currentPassword) {
                dispatch(setError("Current password is required."));
                return;
            }
        }

        dispatch(setLoading(true));

        const payload = {
            name: form.name,
            email: form.email,
            phone: form.phone,
            ...(isChangingPassword && {
                current_password: form.currentPassword,
                new_password: form.newPassword,
                new_password_confirmation: form.repeatNewPassword,
            }),
        };

        try {
            const res = await api.put("customer/account/edit", payload, {
                headers: { Authorization: `Bearer ${token}` },
            });

            dispatch(setUser(res.data.payload));
            dispatch(setSuccessMessage("Account updated successfully."));
            setIsEditingAccount(false);
            setIsChangingPassword(false);
            resetPasswordFields();
        } catch (err) {
            dispatch(
                setError(
                    err.response?.data?.message || "Failed to update account.",
                ),
            );
        } finally {
            dispatch(setLoading(false));
        }
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
                            >
                                Cancel
                            </Button>
                            <Button
                                color="brand"
                                className="d-inline-flex item-center gap-2"
                                onClick={handleSave}
                                loading={loading}
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
                                    onClick={handleSave}
                                    loading={loading}
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
