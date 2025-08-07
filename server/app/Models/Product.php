<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'description',
        'price',
        'stock',
        'category',
    ];


    public function image()
    {
        return $this->hasMany(ProductImage::class);
    }
    public function orderitems()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function notifications()
    {
        return $this->hasMany(\App\Models\ProductNotification::class);
    }
}
