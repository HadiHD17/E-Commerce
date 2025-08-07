<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductNotification extends Model
{
    protected $fillable = ['user_id', 'product_id', 'notified'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
