export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      activity_logs: {
        Row: {
          action: string | null
          created_at: string | null
          details: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          action?: string | null
          created_at?: string | null
          details?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          action?: string | null
          created_at?: string | null
          details?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      announcements: {
        Row: {
          active: boolean | null
          created_at: string | null
          id: string
          text: string
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          id?: string
          text: string
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          id?: string
          text?: string
        }
        Relationships: []
      }
      billing: {
        Row: {
          amount: number | null
          client_id: string | null
          created_at: string | null
          currency: string | null
          id: string
          invoice_url: string | null
          status: string | null
        }
        Insert: {
          amount?: number | null
          client_id?: string | null
          created_at?: string | null
          currency?: string | null
          id?: string
          invoice_url?: string | null
          status?: string | null
        }
        Update: {
          amount?: number | null
          client_id?: string | null
          created_at?: string | null
          currency?: string | null
          id?: string
          invoice_url?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "billing_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          content: string
          created_at: string | null
          excerpt: string | null
          id: string
          published: boolean | null
          slug: string
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          excerpt?: string | null
          id?: string
          published?: boolean | null
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          excerpt?: string | null
          id?: string
          published?: boolean | null
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          created_at: string | null
          id: string
          is_from_client: boolean | null
          license_id: string | null
          message: string
          project_id: string | null
          read_at: string | null
          sender_email: string
          sender_id: string | null
          sender_name: string
          status: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_from_client?: boolean | null
          license_id?: string | null
          message: string
          project_id?: string | null
          read_at?: string | null
          sender_email: string
          sender_id?: string | null
          sender_name: string
          status?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_from_client?: boolean | null
          license_id?: string | null
          message?: string
          project_id?: string | null
          read_at?: string | null
          sender_email?: string
          sender_id?: string | null
          sender_name?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_license_id_fkey"
            columns: ["license_id"]
            isOneToOne: false
            referencedRelation: "licenses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_messages_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      client_projects: {
        Row: {
          client_id: string | null
          created_at: string | null
          id: string
          license_key: string | null
          private_notes: string | null
          project_id: string | null
        }
        Insert: {
          client_id?: string | null
          created_at?: string | null
          id?: string
          license_key?: string | null
          private_notes?: string | null
          project_id?: string | null
        }
        Update: {
          client_id?: string | null
          created_at?: string | null
          id?: string
          license_key?: string | null
          private_notes?: string | null
          project_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "client_projects_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_projects_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          business_name: string | null
          contact_email: string
          created_at: string | null
          id: string
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          business_name?: string | null
          contact_email: string
          created_at?: string | null
          id?: string
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          business_name?: string | null
          contact_email?: string
          created_at?: string | null
          id?: string
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      docs: {
        Row: {
          category: string | null
          content: string
          created_at: string | null
          id: string
          is_public: boolean | null
          order_index: number | null
          slug: string
          title: string
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          content: string
          created_at?: string | null
          id?: string
          is_public?: boolean | null
          order_index?: number | null
          slug: string
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          content?: string
          created_at?: string | null
          id?: string
          is_public?: boolean | null
          order_index?: number | null
          slug?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      downloads: {
        Row: {
          client_id: string | null
          downloaded_at: string | null
          file_url: string | null
          id: string
          project_id: string | null
        }
        Insert: {
          client_id?: string | null
          downloaded_at?: string | null
          file_url?: string | null
          id?: string
          project_id?: string | null
        }
        Update: {
          client_id?: string | null
          downloaded_at?: string | null
          file_url?: string | null
          id?: string
          project_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "downloads_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "downloads_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      header_announcements: {
        Row: {
          created_at: string | null
          enabled: boolean | null
          id: string
          link_text: string | null
          link_url: string | null
          text: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          enabled?: boolean | null
          id?: string
          link_text?: string | null
          link_url?: string | null
          text: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          enabled?: boolean | null
          id?: string
          link_text?: string | null
          link_url?: string | null
          text?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      license_domains: {
        Row: {
          domain: string
          first_seen: string | null
          id: string
          last_seen: string | null
          license_id: string | null
        }
        Insert: {
          domain: string
          first_seen?: string | null
          id?: string
          last_seen?: string | null
          license_id?: string | null
        }
        Update: {
          domain?: string
          first_seen?: string | null
          id?: string
          last_seen?: string | null
          license_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "license_domains_license_id_fkey"
            columns: ["license_id"]
            isOneToOne: false
            referencedRelation: "licenses"
            referencedColumns: ["id"]
          },
        ]
      }
      license_events: {
        Row: {
          created_at: string | null
          domain: string | null
          error_code: string | null
          event_type: string
          id: string
          license_id: string | null
          message: string | null
          metadata: Json | null
        }
        Insert: {
          created_at?: string | null
          domain?: string | null
          error_code?: string | null
          event_type: string
          id?: string
          license_id?: string | null
          message?: string | null
          metadata?: Json | null
        }
        Update: {
          created_at?: string | null
          domain?: string | null
          error_code?: string | null
          event_type?: string
          id?: string
          license_id?: string | null
          message?: string | null
          metadata?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "license_events_license_id_fkey"
            columns: ["license_id"]
            isOneToOne: false
            referencedRelation: "licenses"
            referencedColumns: ["id"]
          },
        ]
      }
      license_logs: {
        Row: {
          created_at: string | null
          domain: string
          id: string
          last_checked: string | null
          license_id: string | null
        }
        Insert: {
          created_at?: string | null
          domain: string
          id?: string
          last_checked?: string | null
          license_id?: string | null
        }
        Update: {
          created_at?: string | null
          domain?: string
          id?: string
          last_checked?: string | null
          license_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "license_logs_license_id_fkey"
            columns: ["license_id"]
            isOneToOne: false
            referencedRelation: "licenses"
            referencedColumns: ["id"]
          },
        ]
      }
      licenses: {
        Row: {
          client_project_id: string | null
          created_at: string | null
          expires_at: string | null
          id: string
          license_key: string
          max_domains: number | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          client_project_id?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          license_key: string
          max_domains?: number | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          client_project_id?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          license_key?: string
          max_domains?: number | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "licenses_client_project_id_fkey"
            columns: ["client_project_id"]
            isOneToOne: false
            referencedRelation: "client_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      portfolio: {
        Row: {
          created_at: string | null
          demo_url: string | null
          featured: boolean | null
          full_description: string | null
          id: string
          image_url: string | null
          short_description: string | null
          tech_stack: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          demo_url?: string | null
          featured?: boolean | null
          full_description?: string | null
          id?: string
          image_url?: string | null
          short_description?: string | null
          tech_stack?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          demo_url?: string | null
          featured?: boolean | null
          full_description?: string | null
          id?: string
          image_url?: string | null
          short_description?: string | null
          tech_stack?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string | null
          id: string
          role: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      project_requests: {
        Row: {
          additional_notes: string | null
          business_name: string | null
          created_at: string | null
          description: string
          email: string
          full_name: string
          id: string
          phone: string | null
          project_title: string
          status: string | null
        }
        Insert: {
          additional_notes?: string | null
          business_name?: string | null
          created_at?: string | null
          description: string
          email: string
          full_name: string
          id?: string
          phone?: string | null
          project_title: string
          status?: string | null
        }
        Update: {
          additional_notes?: string | null
          business_name?: string | null
          created_at?: string | null
          description?: string
          email?: string
          full_name?: string
          id?: string
          phone?: string | null
          project_title?: string
          status?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          created_at: string | null
          demo_url: string | null
          featured: boolean | null
          full_description: string | null
          id: string
          image_url: string | null
          short_description: string
          tech_stack: string[] | null
          title: string
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          demo_url?: string | null
          featured?: boolean | null
          full_description?: string | null
          id?: string
          image_url?: string | null
          short_description: string
          tech_stack?: string[] | null
          title: string
          type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          demo_url?: string | null
          featured?: boolean | null
          full_description?: string | null
          id?: string
          image_url?: string | null
          short_description?: string
          tech_stack?: string[] | null
          title?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      settings: {
        Row: {
          created_at: string | null
          deployment: string | null
          favicon_url: string | null
          id: string
          logo_url: string | null
          site_title: string | null
          smtp_host: string | null
          smtp_pass: string | null
          smtp_user: string | null
          theme: string | null
        }
        Insert: {
          created_at?: string | null
          deployment?: string | null
          favicon_url?: string | null
          id?: string
          logo_url?: string | null
          site_title?: string | null
          smtp_host?: string | null
          smtp_pass?: string | null
          smtp_user?: string | null
          theme?: string | null
        }
        Update: {
          created_at?: string | null
          deployment?: string | null
          favicon_url?: string | null
          id?: string
          logo_url?: string | null
          site_title?: string | null
          smtp_host?: string | null
          smtp_pass?: string | null
          smtp_user?: string | null
          theme?: string | null
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          client_id: string | null
          created_at: string | null
          id: string
          status: string | null
          subject: string | null
          updated_at: string | null
        }
        Insert: {
          client_id?: string | null
          created_at?: string | null
          id?: string
          status?: string | null
          subject?: string | null
          updated_at?: string | null
        }
        Update: {
          client_id?: string | null
          created_at?: string | null
          id?: string
          status?: string | null
          subject?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "support_tickets_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_attachments: {
        Row: {
          file_url: string | null
          id: string
          ticket_id: string | null
          uploaded_at: string | null
        }
        Insert: {
          file_url?: string | null
          id?: string
          ticket_id?: string | null
          uploaded_at?: string | null
        }
        Update: {
          file_url?: string | null
          id?: string
          ticket_id?: string | null
          uploaded_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ticket_attachments_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_messages: {
        Row: {
          created_at: string | null
          id: string
          message: string | null
          sender_id: string | null
          ticket_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          message?: string | null
          sender_id?: string | null
          ticket_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string | null
          sender_id?: string | null
          ticket_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ticket_messages_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
        ]
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
