# Expense-tracker-api
A RESTful expense tracker api built with NestJs,TypeScript,PostGreSQL,TypeORM and JWT authentication

User can register,login,logout,create Account for expenese and catgory for each account.
Users can add transactions for every categories.


## technologies
- NestJs
- TypeScript
- PostGreSQL
- TypeORM
- JWT
- passport
- class validator


## Feature 
- User registeration, login and logout
- updat user profile 
- create, view, update, delete Account 
- create, view, update, delete Category 
- add, view , update, delete transaction 


## Installatioin 
### 1. Clone the repository
```bash
git clone https://github.com/addehvn/expense-tracker-api 
``` 
### 2. Navigate to the project directory
```bash
cd expense-tracker-api
```

### 3. Install dependecies 
```bash
npm install 
``` 

### 4. Configure enviorment variables
``` bash 
DB_HOST=your_host_name
DB_PORT=database_Port
DB_USERNAME=your_postgres_username
DB_PASSWORD=your_popstgres_password
DB_DATABASE=database_name
```
### 5. Start the application 
```bash
npm run start:dev
```

## API Routes 

|Method|Routes|Description|
|------|------|-----------|
|Post| 'auth/signup'|user registeration|
|Post| 'auth/login' |user login|
|Get| 'user/profile'| user profile|
|Patch| 'user/update'| update user profile|
|Delete| 'user/delete'|delete user|
|Post|'account/create'| create account|
|Get|'account/all'| get all accounts|
|Get|'account/:accountId'| get account detail|
|Patch|'account/update/:accountId'| update account|
|Delete|'account/delete/:accountId'|delete account|
|Post|'categories/:accountId'| create category|
|Get|'all/categories/:accountId'| Get all categories|
|Get|'detail/categories/:accountId/:categoryId'| Get category detail|
|update|'update/categories/:accountId/:categoryId'| update category |
|delete |'delete/categories/:accountId/:categoryId'| delete category|
|Post|'create/:accountId/:categoryId'| add transaction|
|Get|'all/:accountId/:categoryId'| Get all transactions|
|Get|'detail/:accountId/:categoryId/:transactionId'|get transaction detail|
|Patch|'update/:accountId/:categoryId/:transactionId'| update transaction|
|delete|'delete/:accountId/:categoryId/:transactionId'| delete transaction|
