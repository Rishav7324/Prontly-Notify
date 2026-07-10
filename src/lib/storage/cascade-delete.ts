import "server-only";
import { deleteObjectsByPrefix } from "./generate-upload-url";
import { deletePrivateObjectsByPrefix } from "./generate-download-url";

/**
 * Deletes ALL R2 objects under a workspace's prefixes.
 * Called when a workspace is deleted — D1 cascade delete alone
 * leaves orphaned files in R2 since R2 doesn't know about D1 FKs.
 */
export async function deleteWorkspaceR2Objects(workspaceId: string): Promise<{
  publicDeleted: number;
  privateDeleted: number;
}> {
  const [publicDeleted, privateDeleted] = await Promise.all([
    deleteObjectsByPrefix(`exports/${workspaceId}/`),
    deleteObjectsByPrefix(`invoices/${workspaceId}/`),
    deletePrivateObjectsByPrefix(`exports/${workspaceId}/`),
    deletePrivateObjectsByPrefix(`invoices/${workspaceId}/`),
  ]);

  return {
    publicDeleted: publicDeleted,
    privateDeleted: privateDeleted,
  };
}

/**
 * Deletes ALL R2 objects under a site's prefixes.
 * Called when a site is deleted.
 */
export async function deleteSiteR2Objects(siteId: string): Promise<{
  publicDeleted: number;
}> {
  const publicDeleted = await deleteObjectsByPrefix(`sites/${siteId}/`);
  return { publicDeleted };
}
