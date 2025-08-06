<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserContext extends Model
{
    protected $fillable = ['user_id', 'last_product_ids'];
    protected $casts = [
        'last_product_ids' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
