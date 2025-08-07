<?php

namespace App\Services\User;

use App\Models\User;

class UserService
{
    static function getUserById($userId)
    {
        return User::find($userId);
    }
}
