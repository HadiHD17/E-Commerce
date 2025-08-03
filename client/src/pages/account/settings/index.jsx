import { useState } from "react";
import { CheckIcon, PencilSimpleLineIcon } from "@phosphor-icons/react";
import Button from "@/components/shared/button";
import Input from "@/components/shared/input";
import "./account-settings.css";

export default function AccountSettingsPage() {
    const [isEditingAccount, setIsEditingAccount] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);

    return (
        <div className="account-settings">
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
                        defaultValue="John M. Doe"
                        disabled={!isEditingAccount}
                    />
                    <Input
                        label="Email Address"
                        id="email"
                        type="email"
                        defaultValue="john@example.com"
                        disabled={!isEditingAccount}
                    />
                    <Input
                        label="Phone Number"
                        id="phone"
                        type="text"
                        defaultValue="+1 234 43 210"
                        disabled={!isEditingAccount}
                    />
                    {isEditingAccount && (
                        <div className="d-flex items-center gap-3 self-end">
                            <Button
                                variant="outlined"
                                color="gray"
                                onClick={() => setIsEditingAccount(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                color="brand"
                                className="d-inline-flex item-center gap-2"
                            >
                                Save Changes
                                <CheckIcon size={18} />
                            </Button>
                        </div>
                    )}
                </div>
            </section>
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
                        defaultValue="1234"
                        withPasswordToggle
                        disabled={!isChangingPassword}
                    />
                    {isChangingPassword && (
                        <>
                            <Input
                                label="New Password"
                                id="new-password"
                                type="password"
                                defaultValue="1234"
                                withPasswordToggle
                            />
                            <Input
                                label="Repeat New Password"
                                id="repeat-new-password"
                                type="password"
                                defaultValue="1234"
                                withPasswordToggle
                            />
                        </>
                    )}

                    {isChangingPassword && (
                        <div className="d-flex items-center gap-3 self-end">
                            <Button
                                variant="outlined"
                                color="gray"
                                onClick={() => setIsChangingPassword(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                color="brand"
                                className="d-inline-flex item-center gap-2"
                            >
                                Change Password
                                <CheckIcon size={18} />
                            </Button>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
