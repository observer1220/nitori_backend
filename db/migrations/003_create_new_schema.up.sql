CREATE TABLE
  "products" (
    "id" bigserial PRIMARY KEY,
    "name" varchar(255) NOT NULL,
    "price" integer NOT NULL,
    "discount_price" integer,
    "stock" integer NOT NULL,
    "status" varchar(20) NOT NULL,
    "category_id" bigint,
    "supplier_id" bigint
  );

CREATE TABLE
  "categories" (
    "id" bigserial PRIMARY KEY,
    "name" varchar(255) NOT NULL
  );

CREATE TABLE
  "suppliers" (
    "id" bigserial PRIMARY KEY,
    "name" varchar(255) NOT NULL,
    "email" varchar(320) UNIQUE,
    "phone_number" varchar(15) UNIQUE
  );

CREATE TABLE
  "warehouses" (
    "id" bigserial PRIMARY KEY,
    "location" varchar(255) NOT NULL,
    "capacity" integer
  );

CREATE TABLE
  "inventory" (
    "id" bigserial PRIMARY KEY,
    "product_id" bigint,
    "warehouse_id" bigint,
    "quantity" integer NOT NULL
  );

CREATE TABLE
  "customers" (
    "id" bigserial PRIMARY KEY,
    "name" varchar(255) NOT NULL,
    "email" varchar(320) UNIQUE,
    "phone_number" varchar(15) UNIQUE
  );

CREATE TABLE
  "orders" (
    "id" bigserial PRIMARY KEY,
    "customer_id" bigint,
    "order_date" timestamp NOT NULL DEFAULT (now ()),
    "status" varchar(20) NOT NULL,
    "total_price" integer
  );

CREATE TABLE
  "order_items" (
    "id" bigserial PRIMARY KEY,
    "order_id" bigint,
    "product_id" bigint,
    "quantity" integer NOT NULL,
    "price" integer NOT NULL
  );

CREATE TABLE
  "employees" (
    "id" bigserial PRIMARY KEY,
    "name" varchar(255) NOT NULL,
    "position" varchar(100),
    "warehouse_id" bigint
  );

CREATE TABLE
  "employee_warehouses" ("employee_id" bigint, "warehouse_id" bigint);

COMMENT ON COLUMN "products"."price" IS 'price must be >= 0';

COMMENT ON COLUMN "products"."discount_price" IS 'discount_price must be between 0 and price';

COMMENT ON COLUMN "products"."stock" IS 'stock must be >= 0';

COMMENT ON COLUMN "products"."status" IS 'values: available, out_of_stock, discontinued';

COMMENT ON COLUMN "warehouses"."capacity" IS 'capacity must be >= 0';

COMMENT ON COLUMN "inventory"."quantity" IS 'quantity must be >= 0';

COMMENT ON COLUMN "orders"."status" IS 'values: pending, paid, shipped, cancelled';

COMMENT ON COLUMN "orders"."total_price" IS 'total_price must be >= 0';

COMMENT ON COLUMN "order_items"."quantity" IS 'quantity must be > 0';

COMMENT ON COLUMN "order_items"."price" IS 'price must be >= 0';

ALTER TABLE "products" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id");

ALTER TABLE "products" ADD FOREIGN KEY ("supplier_id") REFERENCES "suppliers" ("id");

ALTER TABLE "inventory" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

ALTER TABLE "inventory" ADD FOREIGN KEY ("warehouse_id") REFERENCES "warehouses" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("customer_id") REFERENCES "customers" ("id");

ALTER TABLE "order_items" ADD FOREIGN KEY ("order_id") REFERENCES "orders" ("id");

ALTER TABLE "order_items" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

ALTER TABLE "employees" ADD FOREIGN KEY ("warehouse_id") REFERENCES "warehouses" ("id");

ALTER TABLE "employee_warehouses" ADD FOREIGN KEY ("employee_id") REFERENCES "employees" ("id");

ALTER TABLE "employee_warehouses" ADD FOREIGN KEY ("warehouse_id") REFERENCES "warehouses" ("id");