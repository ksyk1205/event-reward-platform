print('🚀 ===> MongoDB Initialization Started');
db = db.getSiblingDB('auth');
db.createCollection('users');
db.users.insertMany([
    {
        userId: "admin",
        password: "admin1234",
        role: "ADMIN",
        createdAt: new Date(),
        updatedAt: new Date()
    },
]);
print('✅ ===> Initial data has been inserted successfully.');
