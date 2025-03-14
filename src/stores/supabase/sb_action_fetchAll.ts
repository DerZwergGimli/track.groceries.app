export async function sb_fetchAll(db: any, table: string) {
  const { data, error } = await db.from(table).select("*");
  if (error) {
    console.error("Error fetching items:", error);
  } else {
    return data;
  }
}
