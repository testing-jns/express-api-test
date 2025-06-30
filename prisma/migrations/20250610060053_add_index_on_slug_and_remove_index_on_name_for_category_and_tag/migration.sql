-- DropIndex
DROP INDEX "categories_name_idx";

-- DropIndex
DROP INDEX "tags_name_idx";

-- CreateIndex
CREATE INDEX "categories_slug_idx" ON "categories"("slug");

-- CreateIndex
CREATE INDEX "tags_slug_idx" ON "tags"("slug");
