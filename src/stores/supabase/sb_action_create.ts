export async function sb_create(db: any, table: string, item: any) {
  const { data, error } = await db.from(table).insert([item]);

  if (error) {
    console.error("Error creating item:", error);
    return `Error creating ${item.name}!`; // Indicate failure
  }

  console.log(`${table} created:`, data);
  return `${item.name} created!`; // Indicate success
}
