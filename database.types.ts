export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      event_participate: {
        Row: {
          id: number;
          participated_event_id: string | null;
          participating_account_id: string | null;
        };
        Insert: {
          id?: number;
          participated_event_id?: string | null;
          participating_account_id?: string | null;
        };
        Update: {
          id?: number;
          participated_event_id?: string | null;
          participating_account_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "event_participate_participated_event_id_fkey";
            columns: ["participated_event_id"];
            referencedRelation: "events";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "event_participate_participating_account_id_fkey";
            columns: ["participating_account_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      events: {
        Row: {
          capacity: number | null;
          description: string | null;
          end_date: Date | null;
          end_time: string | null;
          host_id: string | null;
          id: string | null;
          image_url: string | null;
          is_published: boolean | null;
          place: string | null;
          place_link: string | null;
          start_date: Date | null;
          start_time: string | null;
          title: string | null;
        };
        Insert: {
          capacity?: number | null;
          description: string;
          end_date?: Date | null;
          end_time?: string | null;
          host_id?: string | null;
          id?: string;
          image_url?: string | null;
          is_published?: boolean | null;
          place?: string | null;
          place_link?: string | null;
          start_date?: Date | null;
          start_time?: string | null;
          title: string;
        };
        Update: {
          capacity?: number | null;
          description?: string;
          end_date?: Date | null;
          end_time?: string | null;
          host_id?: string | null;
          id?: string;
          image_url?: string | null;
          is_published?: boolean | null;
          place?: string | null;
          place_link?: string | null;
          start_date?: Date | null;
          start_time?: string | null;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "events_host_id_fkey";
            columns: ["host_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          full_name: string | null;
          id: string;
          updated_at: string | null;
          username: string | null;
          website: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          full_name?: string | null;
          id: string;
          updated_at?: string | null;
          username?: string | null;
          website?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          full_name?: string | null;
          id?: string;
          updated_at?: string | null;
          username?: string | null;
          website?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
