export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Collections: {
        Row: {
          connection_id: string | null
          created_at: string
          id: string
          last_updated_at: string | null
          name: string | null
          slug: string | null
          uuid: string | null
        }
        Insert: {
          connection_id?: string | null
          created_at?: string
          id: string
          last_updated_at?: string | null
          name?: string | null
          slug?: string | null
          uuid?: string | null
        }
        Update: {
          connection_id?: string | null
          created_at?: string
          id?: string
          last_updated_at?: string | null
          name?: string | null
          slug?: string | null
          uuid?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Collections_connection_id_fkey"
            columns: ["connection_id"]
            isOneToOne: false
            referencedRelation: "Connections"
            referencedColumns: ["id"]
          }
        ]
      }
      Connections: {
        Row: {
          created_at: string
          document_ids: string[] | null
          id: string
          last_updated_at: string | null
          name: string | null
          slug: string | null
          uuid: string | null
        }
        Insert: {
          created_at?: string
          document_ids?: string[] | null
          id: string
          last_updated_at?: string | null
          name?: string | null
          slug?: string | null
          uuid?: string | null
        }
        Update: {
          created_at?: string
          document_ids?: string[] | null
          id?: string
          last_updated_at?: string | null
          name?: string | null
          slug?: string | null
          uuid?: string | null
        }
        Relationships: []
      }
      Documents: {
        Row: {
          collection_id: string | null
          created_at: string
          embedding_ids: string[] | null
          id: string
          last_updated_at: string | null
          name: string | null
        }
        Insert: {
          collection_id?: string | null
          created_at?: string
          embedding_ids?: string[] | null
          id: string
          last_updated_at?: string | null
          name?: string | null
        }
        Update: {
          collection_id?: string | null
          created_at?: string
          embedding_ids?: string[] | null
          id?: string
          last_updated_at?: string | null
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Documents_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "Collections"
            referencedColumns: ["id"]
          }
        ]
      }
      Embeddings: {
        Row: {
          created_at: string
          document_id: string | null
          id: string
          last_updated_at: string | null
        }
        Insert: {
          created_at?: string
          document_id?: string | null
          id: string
          last_updated_at?: string | null
        }
        Update: {
          created_at?: string
          document_id?: string | null
          id?: string
          last_updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Embeddings_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "Documents"
            referencedColumns: ["id"]
          }
        ]
      }
      Users: {
        Row: {
          created_at: string
          email: string | null
          id: string
          last_sign_in_at: string | null
          last_updated_at: string | null
          password: string | null
          role: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id: string
          last_sign_in_at?: string | null
          last_updated_at?: string | null
          password?: string | null
          role?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          last_sign_in_at?: string | null
          last_updated_at?: string | null
          password?: string | null
          role?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
