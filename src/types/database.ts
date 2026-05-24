export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type ExpenseCategory =
  | 'raw_material'
  | 'additional_material'
  | 'production'
  | 'distribution'
  | 'other'

export type ConfirmationStatus =
  | 'actual'
  | 'estimated'
  | 'unconfirmed'

export type ReceivableStatus = 'LUNAS' | 'BELUM_LUNAS'

export type Database = {
  public: {
    Tables: {
      business_profiles: {
        Row: {
          id: string
          user_id: string
          business_name: string
          product_name: string
          tofu_per_board: number
          tofu_per_pack: number
          default_boards_per_day: number
          default_price_per_tofu: number
          default_price_per_pack: number
          default_production_days_per_month: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string
          business_name: string
          product_name: string
          tofu_per_board?: number
          tofu_per_pack?: number
          default_boards_per_day?: number
          default_price_per_tofu?: number
          default_price_per_pack?: number
          default_production_days_per_month?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          business_name?: string
          product_name?: string
          tofu_per_board?: number
          tofu_per_pack?: number
          default_boards_per_day?: number
          default_price_per_tofu?: number
          default_price_per_pack?: number
          default_production_days_per_month?: number
          updated_at?: string
        }
        Relationships: []
      }
      customers: {
        Row: {
          id: string
          user_id: string
          name: string
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string
          name: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          notes?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      expenses: {
        Row: {
          id: string
          user_id: string
          date: string
          category: ExpenseCategory
          item_name: string
          quantity: number
          unit: string
          unit_price: number
          total: number
          confirmation_status: ConfirmationStatus
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string
          date: string
          category: ExpenseCategory
          item_name: string
          quantity: number
          unit: string
          unit_price: number
          total: number
          confirmation_status?: ConfirmationStatus
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          date?: string
          category?: ExpenseCategory
          item_name?: string
          quantity?: number
          unit?: string
          unit_price?: number
          total?: number
          confirmation_status?: ConfirmationStatus
          notes?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      sales_transactions: {
        Row: {
          id: string
          user_id: string
          customer_id: string | null
          date: string
          packs: number
          price_per_pack: number
          total_sales: number
          amount_paid: number
          receivable_amount: number
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string
          customer_id?: string | null
          date: string
          packs: number
          price_per_pack: number
          total_sales: number
          amount_paid: number
          receivable_amount: number
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          customer_id?: string | null
          date?: string
          packs?: number
          price_per_pack?: number
          total_sales?: number
          amount_paid?: number
          receivable_amount?: number
          notes?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'sales_transactions_customer_id_fkey'
            columns: ['customer_id']
            referencedRelation: 'customers'
            referencedColumns: ['id']
          }
        ]
      }
      receivable_payments: {
        Row: {
          id: string
          user_id: string
          sales_transaction_id: string
          date: string
          amount: number
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string
          sales_transaction_id: string
          date: string
          amount: number
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          sales_transaction_id?: string
          date?: string
          amount?: number
          notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'receivable_payments_sales_transaction_id_fkey'
            columns: ['sales_transaction_id']
            referencedRelation: 'sales_transactions'
            referencedColumns: ['id']
          }
        ]
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: {
      expense_category: ExpenseCategory
      confirmation_status: ConfirmationStatus
    }
    CompositeTypes: Record<string, never>
  }
}

export type BusinessProfile = Database['public']['Tables']['business_profiles']['Row']
export type Expense = Database['public']['Tables']['expenses']['Row']
export type Customer = Database['public']['Tables']['customers']['Row']
export type SalesTransaction = Database['public']['Tables']['sales_transactions']['Row']
export type ReceivablePayment = Database['public']['Tables']['receivable_payments']['Row']
