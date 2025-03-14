export async function sb_delete(db: any, table: string, id: any) {
  const { data, error } = await db.from(table).delete().eq("id", id);
  if (error) {
    console.error("Error deleting item:", error);
    return `Error deleting ${table}!`; // Indicate failure
  }

  console.log(`${table} deleted:`, data);
  return `${table} deleted!`; // Indicate success
}
