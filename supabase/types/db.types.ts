export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      contributors: {
        Row: {
          avatar_url: string | null;
          bio: string | null;
          created_at: string;
          id: number;
          is_draft: boolean;
          name: string;
          personal_website_url: string | null;
          role: string | null;
          twitter_username: string | null;
          updated_at: string;
          why: string;
          youtube_channel_id: string | null;
          youtube_username: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
          id?: number;
          is_draft?: boolean;
          name: string;
          personal_website_url?: string | null;
          role?: string | null;
          twitter_username?: string | null;
          updated_at?: string;
          why?: string;
          youtube_channel_id?: string | null;
          youtube_username?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
          id?: number;
          is_draft?: boolean;
          name?: string;
          personal_website_url?: string | null;
          role?: string | null;
          twitter_username?: string | null;
          updated_at?: string;
          why?: string;
          youtube_channel_id?: string | null;
          youtube_username?: string | null;
        };
        Relationships: [];
      };
      webpages: {
        Row: {
          created_at: string | null;
          id: number;
          link: string;
          snippet: string | null;
          title: string;
          updated_at: string | null;
          website_id: number;
        };
        Insert: {
          created_at?: string | null;
          id?: never;
          link: string;
          snippet?: string | null;
          title: string;
          updated_at?: string | null;
          website_id: number;
        };
        Update: {
          created_at?: string | null;
          id?: never;
          link?: string;
          snippet?: string | null;
          title?: string;
          updated_at?: string | null;
          website_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "website_id_fkey";
            columns: ["website_id"];
            isOneToOne: false;
            referencedRelation: "websites";
            referencedColumns: ["id"];
          },
        ];
      };
      websites: {
        Row: {
          created_at: string | null;
          domain: string;
          id: number;
          image_url: string;
          last_time_scraped: string | null;
          search_url: string | null;
          snippet: string;
          title: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          domain: string;
          id?: number;
          image_url: string;
          last_time_scraped?: string | null;
          search_url?: string | null;
          snippet: string;
          title?: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          domain?: string;
          id?: number;
          image_url?: string;
          last_time_scraped?: string | null;
          search_url?: string | null;
          snippet?: string;
          title?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      youtube: {
        Row: {
          channel_title: string;
          created_at: string | null;
          description: string | null;
          id: number;
          published_at: string | null;
          thumbnails: Json;
          title: string;
          updated_at: string | null;
          video_id: string;
          youtube_channels_id: number | null;
        };
        Insert: {
          channel_title: string;
          created_at?: string | null;
          description?: string | null;
          id: number;
          published_at?: string | null;
          thumbnails: Json;
          title: string;
          updated_at?: string | null;
          video_id: string;
          youtube_channels_id?: number | null;
        };
        Update: {
          channel_title?: string;
          created_at?: string | null;
          description?: string | null;
          id?: number;
          published_at?: string | null;
          thumbnails?: Json;
          title?: string;
          updated_at?: string | null;
          video_id?: string;
          youtube_channels_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "youtube_youtube_channels_id_fkey";
            columns: ["youtube_channels_id"];
            isOneToOne: false;
            referencedRelation: "youtube_channels";
            referencedColumns: ["id"];
          },
        ];
      };
      youtube_channels: {
        Row: {
          channel_id: string | null;
          channel_title: string;
          channel_username: string;
          created_at: string;
          id: number;
          last_published_video_date: string | null;
          updated_at: string;
        };
        Insert: {
          channel_id?: string | null;
          channel_title: string;
          channel_username: string;
          created_at?: string;
          id: number;
          last_published_video_date?: string | null;
          updated_at?: string;
        };
        Update: {
          channel_id?: string | null;
          channel_title?: string;
          channel_username?: string;
          created_at?: string;
          id?: number;
          last_published_video_date?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      count_search_videos: {
        Args: {
          search_term: string;
        };
        Returns: number;
      };
      count_search_webpages: {
        Args: {
          search_term: string;
        };
        Returns: number;
      };
      get_contributors: {
        Args: {
          limit_count: number;
          random_order: boolean;
        };
        Returns: {
          name: string;
          role: string;
          bio: string;
          avatar_url: string;
        }[];
      };
      search_webpages: {
        Args: {
          search_term: string;
        };
        Returns: {
          title: string;
          snippet: string;
          link: string;
          website_id: number;
          website: Json;
        }[];
      };
      search_youtube: {
        Args: {
          search_term: string;
        };
        Returns: {
          channel_title: string;
          created_at: string | null;
          description: string | null;
          id: number;
          published_at: string | null;
          thumbnails: Json;
          title: string;
          updated_at: string | null;
          video_id: string;
          youtube_channels_id: number | null;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

// Schema: public
// Tables
export type Contributor = Database["public"]["Tables"]["contributors"]["Row"];
export type InsertContributor =
  Database["public"]["Tables"]["contributors"]["Insert"];
export type UpdateContributor =
  Database["public"]["Tables"]["contributors"]["Update"];

export type Webpage = Database["public"]["Tables"]["webpages"]["Row"];
export type InsertWebpage = Database["public"]["Tables"]["webpages"]["Insert"];
export type UpdateWebpage = Database["public"]["Tables"]["webpages"]["Update"];

export type Website = Database["public"]["Tables"]["websites"]["Row"];
export type InsertWebsite = Database["public"]["Tables"]["websites"]["Insert"];
export type UpdateWebsite = Database["public"]["Tables"]["websites"]["Update"];

export type Youtube = Database["public"]["Tables"]["youtube"]["Row"];
export type InsertYoutube = Database["public"]["Tables"]["youtube"]["Insert"];
export type UpdateYoutube = Database["public"]["Tables"]["youtube"]["Update"];

export type YoutubeChannel =
  Database["public"]["Tables"]["youtube_channels"]["Row"];
export type InsertYoutubeChannel =
  Database["public"]["Tables"]["youtube_channels"]["Insert"];
export type UpdateYoutubeChannel =
  Database["public"]["Tables"]["youtube_channels"]["Update"];

// Functions
export type ArgsCountSearchVideo =
  Database["public"]["Functions"]["count_search_videos"]["Args"];
export type ReturnTypeCountSearchVideo =
  Database["public"]["Functions"]["count_search_videos"]["Returns"];

export type ArgsCountSearchWebpage =
  Database["public"]["Functions"]["count_search_webpages"]["Args"];
export type ReturnTypeCountSearchWebpage =
  Database["public"]["Functions"]["count_search_webpages"]["Returns"];

export type ArgsGetContributor =
  Database["public"]["Functions"]["get_contributors"]["Args"];
export type ReturnTypeGetContributor =
  Database["public"]["Functions"]["get_contributors"]["Returns"];

export type ArgsSearchWebpage =
  Database["public"]["Functions"]["search_webpages"]["Args"];
export type ReturnTypeSearchWebpage =
  Database["public"]["Functions"]["search_webpages"]["Returns"];

export type ArgsSearchYoutube =
  Database["public"]["Functions"]["search_youtube"]["Args"];
export type ReturnTypeSearchYoutube =
  Database["public"]["Functions"]["search_youtube"]["Returns"];
