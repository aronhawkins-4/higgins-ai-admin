export type Connection = {
  created_at: string;
  document_ids: string[] | null;
  id: string;
  last_updated_at: string | null;
  name: string | null;
  open_ai_api_key: string | null;
  slug: string | null;
  userIds: string[] | null;
  uuid: string | null;
  vector_db_url: string | null;
};
