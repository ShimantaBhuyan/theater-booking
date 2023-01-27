import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export class SBClient {
  private static instance: SBClient;
  private supabase: SupabaseClient;

  private constructor() {
    this.supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    );
  }

  public static getInstance(): SBClient {
    if (!SBClient.instance) {
      SBClient.instance = new SBClient();
    }
    return SBClient.instance;
  }

  public fetchRows = async () => {
    try {
      const rows = await this.supabase.from("rows").select("*").order("id", { ascending: true });
      if (rows.status === 200) {
        return { success: true, message: "Rows data fetched successfully", data: rows };
      } else {
        return { success: false, message: "Failed to fetch rows data", data: rows };
      }
    } catch (error) {
      console.error(error);
      return { success: false, message: "Error while fetching rows data" };
    }
  };

  public fetchSeats = async () => {
    try {
      const seats = await this.supabase.from("seat").select("*").order("id", { ascending: true });
      if (seats.status === 200) {
        return { success: true, message: "Seats data fetched successfully", data: seats };
      } else {
        return { success: false, message: "Failed to fetch seats data", data: seats };
      }
    } catch (error) {
      console.error(error);
      return { success: false, message: "Error while fetching seats data" };
    }
  };

  public insert = async (tableName: string, data: any): Promise<any> => {
    try {
      const insertData = await this.supabase.from(tableName).insert(data).select();
      if (insertData.status === 200 || insertData.status === 201) {
        return { success: true, message: "Data inserted successfully", data: insertData };
      }
      return { success: false, message: "Error while inserting data", data: insertData };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Error while inserting data" };
    }
  };

  public upsert = async (tableName: string, data: any): Promise<any> => {
    try {
      const updateData = await this.supabase.from(tableName).upsert(data).select();
      if (updateData.status === 200 || updateData.status === 201) {
        return { success: true, message: "Data inserted successfully", data: updateData };
      }
      return { success: false, message: "Error while inserting data", data: updateData };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Error while updating data" };
    }
  };

  public delete = async (tableName: string): Promise<any> => {
    try {
      const deleteData = await this.supabase.from(tableName).delete().gte("id", 1);
      if (deleteData.status === 200 || deleteData.status === 201 || deleteData.status === 204) {
        return { success: true, message: "Table deleted successfully", data: deleteData };
      }
      return { success: false, message: "Error while deleting table", data: deleteData };
    } catch (error) {
      console.error(error);
      return { success: false, message: `Error while deleting table: ${error}` };
    }
  };

  public getRealtimeSeats = () => {
    const [realtimeSeats, setRealtimeSeats] = useState<any>(null);

    const getRealtime = async () => {
      this.supabase
        .channel("public:seat")
        .on("postgres_changes", { event: "UPDATE", schema: "public", table: "seat" }, payload => {
          setRealtimeSeats(payload.new);
        })
        .subscribe();
    };

    useEffect(() => {
      getRealtime();
    });

    return realtimeSeats;
  };
}
