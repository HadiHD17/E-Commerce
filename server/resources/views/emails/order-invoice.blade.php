<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Order Invoice</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #f8f9fa; padding: 20px; text-align: center; }
        .order-details { margin: 20px 0; }
        .item { border-bottom: 1px solid #eee; padding: 10px 0; }
        .total { font-weight: bold; font-size: 18px; margin-top: 20px; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Order Invoice</h1>
            <p>Thank you for your order!</p>
        </div>

        <div class="order-details">
            <h2>Order #{{ $order->id }}</h2>
            <p><strong>Date:</strong> {{ $order->created_at->format('F j, Y') }}</p>
            <p><strong>Status:</strong> {{ ucfirst($order->status) }}</p>
            <p><strong>Customer:</strong> {{ $user->name }}</p>
            <p><strong>Email:</strong> {{ $user->email }}</p>
        </div>

        <div class="items">
            <h3>Order Items</h3>
            @foreach($order->orderItems as $item)
            <div class="item">
                <strong>{{ $item->product->name }}</strong><br>
                Quantity: {{ $item->quantity }}<br>
                Price: ${{ number_format($item->price_at_time, 2) }}<br>
                Subtotal: ${{ number_format($item->quantity * $item->price_at_time, 2) }}
            </div>
            @endforeach
        </div>

        <div class="total">
            <strong>Total: ${{ number_format($order->total_price, 2) }}</strong>
        </div>

        <div class="footer">
            <p>Thank you for shopping with us!</p>
            <p>If you have any questions, please contact our support team.</p>
        </div>
    </div>
</body>
</html> 