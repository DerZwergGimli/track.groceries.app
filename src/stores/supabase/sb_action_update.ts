export async function sb_update(db: any, table: string, id: any, object: any) {
  const { data, error } = await db
    .from(table)
    .update(object)
    .eq("id", id)
    .select();
  if (error) {
    console.error("Error updating item:", error);
    return `Error updating ${table}!`; // Indicate failure
  }

  console.log(`${table} updated:`, data);
  return `${table} updated!`; // Indicate success
}
