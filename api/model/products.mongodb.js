use('gerenciamentoEstoque')

const products = [
    {
        "id": 1,
        "name": "Wireless Headphones",
        "category": "Electronics",
        "price": 129.99,
        "quantity": 45,
        "status": "In Stock"
    },
    {
        "id": 2,
        "name": "Smartphone X200",
        "category": "Electronics",
        "price": 899.99,
        "quantity": 30,
        "status": "In Stock"
    },
    {
        "id": 3,
        "name": "Gaming Laptop",
        "category": "Computers",
        "price": 1499.99,
        "quantity": 12,
        "status": "In Stock"
    },
    {
        "id": 4,
        "name": "Bluetooth Speaker",
        "category": "Electronics",
        "price": 79.99,
        "quantity": 60,
        "status": "In Stock"
    },
    {
        "id": 5,
        "name": "4K Monitor",
        "category": "Computers",
        "price": 349.99,
        "quantity": 20,
        "status": "In Stock"
    },
    {
        "id": 6,
        "name": "Mechanical Keyboard",
        "category": "Computers",
        "price": 99.99,
        "quantity": 80,
        "status": "In Stock"
    },
    {
        "id": 7,
        "name": "Wireless Mouse",
        "category": "Computers",
        "price": 49.99,
        "quantity": 120,
        "status": "In Stock"
    },
    {
        "id": 8,
        "name": "Smartwatch Pro",
        "category": "Wearables",
        "price": 199.99,
        "quantity": 55,
        "status": "In Stock"
    },
    {
        "id": 9,
        "name": "Fitness Tracker",
        "category": "Wearables",
        "price": 89.99,
        "quantity": 90,
        "status": "In Stock"
    },
    {
        "id": 10,
        "name": "Drone Camera",
        "category": "Electronics",
        "price": 599.99,
        "quantity": 15,
        "status": "In Stock"
    },
    {
        "id": 11,
        "name": "Digital SLR Camera",
        "category": "Photography",
        "price": 999.99,
        "quantity": 8,
        "status": "In Stock"
    },
    {
        "id": 12,
        "name": "Tripod Stand",
        "category": "Photography",
        "price": 49.99,
        "quantity": 35,
        "status": "In Stock"
    },
    {
        "id": 13,
        "name": "LED Ring Light",
        "category": "Photography",
        "price": 59.99,
        "quantity": 50,
        "status": "In Stock"
    },
    {
        "id": 14,
        "name": "Portable Projector",
        "category": "Electronics",
        "price": 229.99,
        "quantity": 18,
        "status": "In Stock"
    },
    {
        "id": 15,
        "name": "Noise Cancelling Earbuds",
        "category": "Electronics",
        "price": 149.99,
        "quantity": 70,
        "status": "In Stock"
    },
    {
        "id": 16,
        "name": "Smart Home Hub",
        "category": "Home Automation",
        "price": 129.99,
        "quantity": 40,
        "status": "In Stock"
    },
    {
        "id": 17,
        "name": "Robot Vacuum Cleaner",
        "category": "Home Appliances",
        "price": 299.99,
        "quantity": 25,
        "status": "In Stock"
    },
    {
        "id": 18,
        "name": "Electric Kettle",
        "category": "Kitchen Appliances",
        "price": 39.99,
        "quantity": 75,
        "status": "In Stock"
    },
    {
        "id": 19,
        "name": "Air Fryer",
        "category": "Kitchen Appliances",
        "price": 99.99,
        "quantity": 50,
        "status": "In Stock"
    },
    {
        "id": 20,
        "name": "Blender Pro",
        "category": "Kitchen Appliances",
        "price": 89.99,
        "quantity": 60,
        "status": "In Stock"
    },
    {
        "id": 21,
        "name": "Espresso Machine",
        "category": "Kitchen Appliances",
        "price": 249.99,
        "quantity": 20,
        "status": "In Stock"
    },
    {
        "id": 22,
        "name": "Gaming Console Z",
        "category": "Gaming",
        "price": 499.99,
        "quantity": 30,
        "status": "In Stock"
    },
    {
        "id": 23,
        "name": "VR Headset",
        "category": "Gaming",
        "price": 299.99,
        "quantity": 22,
        "status": "In Stock"
    },
    {
        "id": 24,
        "name": "Gaming Chair",
        "category": "Gaming",
        "price": 179.99,
        "quantity": 25,
        "status": "In Stock"
    },
    {
        "id": 25,
        "name": "Streaming Microphone",
        "category": "Audio",
        "price": 129.99,
        "quantity": 40,
        "status": "In Stock"
    },
    {
        "id": 26,
        "name": "Studio Headphones",
        "category": "Audio",
        "price": 199.99,
        "quantity": 30,
        "status": "In Stock"
    },
    {
        "id": 27,
        "name": "Electric Toothbrush",
        "category": "Personal Care",
        "price": 69.99,
        "quantity": 90,
        "status": "In Stock"
    },
    {
        "id": 28,
        "name": "Hair Dryer Pro",
        "category": "Personal Care",
        "price": 89.99,
        "quantity": 70,
        "status": "In Stock"
    },
    {
        "id": 29,
        "name": "Beard Trimmer",
        "category": "Personal Care",
        "price": 49.99,
        "quantity": 100,
        "status": "In Stock"
    },
    {
        "id": 30,
        "name": "Smart Thermostat",
        "category": "Home Automation",
        "price": 179.99,
        "quantity": 35,
        "status": "In Stock"
    },
    {
        "id": 31,
        "name": "Security Camera Kit",
        "category": "Home Security",
        "price": 299.99,
        "quantity": 28,
        "status": "In Stock"
    },
    {
        "id": 32,
        "name": "Tablet 10.1''",
        "category": "Electronics",
        "price": 399.99,
        "quantity": 45,
        "status": "In Stock"
    },
    {
        "id": 33,
        "name": "Portable SSD 1TB",
        "category": "Computers",
        "price": 149.99,
        "quantity": 60,
        "status": "In Stock"
    },
    {
        "id": 34,
        "name": "USB-C Hub",
        "category": "Computers",
        "price": 49.99,
        "quantity": 85,
        "status": "In Stock"
    },
    {
        "id": 35,
        "name": "Laptop Cooling Pad",
        "category": "Computers",
        "price": 39.99,
        "quantity": 55,
        "status": "In Stock"
    },
    {
        "id": 36,
        "name": "Wireless Charger",
        "category": "Electronics",
        "price": 29.99,
        "quantity": 100,
        "status": "In Stock"
    },
    {
        "id": 37,
        "name": "Car Dash Camera",
        "category": "Automotive",
        "price": 109.99,
        "quantity": 33,
        "status": "In Stock"
    },
    {
        "id": 38,
        "name": "Bluetooth Car Kit",
        "category": "Automotive",
        "price": 59.99,
        "quantity": 40,
        "status": "In Stock"
    },
    {
        "id": 39,
        "name": "Portable Power Bank",
        "category": "Electronics",
        "price": 49.99,
        "quantity": 75,
        "status": "In Stock"
    },
    {
        "id": 40,
        "name": "Smart Light Bulb",
        "category": "Home Automation",
        "price": 19.99,
        "quantity": 120,
        "status": "In Stock"
    },
    {
        "id": 41,
        "name": "Cordless Drill",
        "category": "Tools",
        "price": 129.99,
        "quantity": 25,
        "status": "In Stock"
    },
    {
        "id": 42,
        "name": "Tool Set 100pcs",
        "category": "Tools",
        "price": 149.99,
        "quantity": 18,
        "status": "In Stock"
    },
    {
        "id": 43,
        "name": "3D Printer Kit",
        "category": "Electronics",
        "price": 499.99,
        "quantity": 12,
        "status": "In Stock"
    },
    {
        "id": 44,
        "name": "Laminator Machine",
        "category": "Office Supplies",
        "price": 69.99,
        "quantity": 30,
        "status": "In Stock"
    },
    {
        "id": 45,
        "name": "Paper Shredder",
        "category": "Office Supplies",
        "price": 89.99,
        "quantity": 22,
        "status": "In Stock"
    },
    {
        "id": 46,
        "name": "Office Chair",
        "category": "Furniture",
        "price": 199.99,
        "quantity": 15,
        "status": "In Stock"
    },
    {
        "id": 47,
        "name": "Standing Desk",
        "category": "Furniture",
        "price": 299.99,
        "quantity": 10,
        "status": "In Stock"
    },
    {
        "id": 48,
        "name": "Whiteboard",
        "category": "Office Supplies",
        "price": 59.99,
        "quantity": 25,
        "status": "In Stock"
    },
    {
        "id": 49,
        "name": "Wi-Fi Extender",
        "category": "Networking",
        "price": 69.99,
        "quantity": 55,
        "status": "In Stock"
    },
    {
        "id": 50,
        "name": "Router AX3000",
        "category": "Networking",
        "price": 139.99,
        "quantity": 40,
        "status": "In Stock"
    }
]
db.products.insertMany(products);

use('gerenciamentoEstoque')
db.products.find().forEach(function (product) {
    db.products.updateOne(
        { _id: product._id },
        { $set: { "quantity": parseInt(product.quantity) } });
})
