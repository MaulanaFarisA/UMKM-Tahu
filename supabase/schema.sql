-- UMKM Tahu MVP 1 Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "pgcrypto";

-- ─── Enums ───────────────────────────────────────────────────────────────────

create type expense_category as enum (
  'raw_material',
  'additional_material',
  'production',
  'distribution',
  'other'
);

create type confirmation_status as enum (
  'actual',
  'estimated',
  'unconfirmed'
);

-- ─── Tables ──────────────────────────────────────────────────────────────────

create table business_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  business_name text not null,
  product_name text not null,
  tofu_per_board numeric not null default 169,
  tofu_per_pack numeric not null default 10,
  default_boards_per_day numeric not null default 10,
  default_price_per_tofu numeric not null default 600,
  default_price_per_pack numeric not null default 6000,
  default_production_days_per_month numeric not null default 25,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table customers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  name text not null,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table expenses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  date date not null,
  category expense_category not null,
  item_name text not null,
  quantity numeric not null,
  unit text not null,
  unit_price numeric not null,
  total numeric not null,
  confirmation_status confirmation_status not null default 'actual',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table sales_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  customer_id uuid references customers(id) on delete set null,
  date date not null,
  packs numeric not null,
  price_per_pack numeric not null,
  total_sales numeric not null,
  amount_paid numeric not null,
  receivable_amount numeric not null,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table receivable_payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  sales_transaction_id uuid not null references sales_transactions(id) on delete cascade,
  date date not null,
  amount numeric not null,
  notes text,
  created_at timestamptz not null default now()
);

-- ─── Row Level Security ───────────────────────────────────────────────────────

alter table business_profiles enable row level security;
alter table customers enable row level security;
alter table expenses enable row level security;
alter table sales_transactions enable row level security;
alter table receivable_payments enable row level security;

-- business_profiles policies
create policy "users can select own business_profiles"
  on business_profiles for select
  using (user_id = auth.uid());

create policy "users can insert own business_profiles"
  on business_profiles for insert
  with check (user_id = auth.uid());

create policy "users can update own business_profiles"
  on business_profiles for update
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- customers policies
create policy "users can select own customers"
  on customers for select
  using (user_id = auth.uid());

create policy "users can insert own customers"
  on customers for insert
  with check (user_id = auth.uid());

create policy "users can update own customers"
  on customers for update
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- expenses policies
create policy "users can select own expenses"
  on expenses for select
  using (user_id = auth.uid());

create policy "users can insert own expenses"
  on expenses for insert
  with check (user_id = auth.uid());

create policy "users can update own expenses"
  on expenses for update
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "users can delete own expenses"
  on expenses for delete
  using (user_id = auth.uid());

-- sales_transactions policies
create policy "users can select own sales_transactions"
  on sales_transactions for select
  using (user_id = auth.uid());

create policy "users can insert own sales_transactions"
  on sales_transactions for insert
  with check (user_id = auth.uid());

create policy "users can update own sales_transactions"
  on sales_transactions for update
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- receivable_payments policies (with cross-user injection fix)
create policy "users can select own receivable_payments"
  on receivable_payments for select
  using (user_id = auth.uid());

create policy "users can insert own receivable_payments"
  on receivable_payments for insert
  with check (
    user_id = auth.uid() and
    exists (
      select 1 from sales_transactions st
      where st.id = sales_transaction_id
      and st.user_id = auth.uid()
    )
  );

create policy "users can update own receivable_payments"
  on receivable_payments for update
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- ─── Updated At Trigger ───────────────────────────────────────────────────────

create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_business_profiles_updated_at
  before update on business_profiles
  for each row execute function update_updated_at();

create trigger update_customers_updated_at
  before update on customers
  for each row execute function update_updated_at();

create trigger update_expenses_updated_at
  before update on expenses
  for each row execute function update_updated_at();

create trigger update_sales_transactions_updated_at
  before update on sales_transactions
  for each row execute function update_updated_at();

-- business_profiles delete policy
create policy "users can delete own business_profiles"
  on business_profiles for delete
  using (user_id = auth.uid());

-- customers delete policy
create policy "users can delete own customers"
  on customers for delete
  using (user_id = auth.uid());

-- sales_transactions delete policy
create policy "users can delete own sales_transactions"
  on sales_transactions for delete
  using (user_id = auth.uid());

-- receivable_payments delete policy
create policy "users can delete own receivable_payments"
  on receivable_payments for delete
  using (user_id = auth.uid());
