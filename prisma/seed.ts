import { PrismaClient } from "@prisma/client";
import { initialCategories, initialProducts, initialBanners, initialSiteSettings } from "../src/lib/initialData";
import crypto from "crypto";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting Prisma seed for UliNail...");

  // 1. Admin User
  const adminPassword = process.env.ADMIN_PASSWORD || "admin";
  const passwordHash = crypto.createHmac("sha256", "ulinail_luxury_secret_session_key_2025").update(adminPassword).digest("hex");

  await prisma.user.upsert({
    where: { email: "admin@ulinail.com" },
    update: {},
    create: {
      email: "admin@ulinail.com",
      name: "UliNail Admin",
      passwordHash,
      role: "ADMIN",
    },
  });

  // 2. Categories & Subcategories
  for (const cat of initialCategories) {
    const createdCat = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {
        nameUa: cat.nameUa,
        namePl: cat.namePl,
        descriptionUa: cat.descriptionUa,
        descriptionPl: cat.descriptionPl,
        image: cat.image,
        sortOrder: cat.sortOrder || 0,
      },
      create: {
        id: cat.id,
        slug: cat.slug,
        nameUa: cat.nameUa,
        namePl: cat.namePl,
        descriptionUa: cat.descriptionUa,
        descriptionPl: cat.descriptionPl,
        image: cat.image,
        sortOrder: cat.sortOrder || 0,
      },
    });

    for (const sub of cat.subCategories) {
      await prisma.subCategory.upsert({
        where: { slug: sub.slug },
        update: {
          nameUa: sub.nameUa,
          namePl: sub.namePl,
          categoryId: createdCat.id,
        },
        create: {
          id: sub.id,
          slug: sub.slug,
          nameUa: sub.nameUa,
          namePl: sub.namePl,
          categoryId: createdCat.id,
        },
      });
    }
  }

  // 3. Products & Variants
  for (const prod of initialProducts) {
    const createdProduct = await prisma.product.upsert({
      where: { slug: prod.slug },
      update: {
        sku: prod.sku,
        titleUa: prod.titleUa,
        titlePl: prod.titlePl,
        descriptionUa: prod.descriptionUa,
        descriptionPl: prod.descriptionPl,
        usageUa: prod.usageUa,
        usagePl: prod.usagePl,
        ingredients: prod.ingredients,
        images: prod.images,
        isHit: !!prod.isHit,
        isNew: !!prod.isNew,
        isSeason: !!prod.isSeason,
        isActive: prod.isActive !== false,
        categoryId: prod.categoryId,
        subCategoryId: prod.subCategoryId,
      },
      create: {
        id: prod.id,
        sku: prod.sku,
        slug: prod.slug,
        titleUa: prod.titleUa,
        titlePl: prod.titlePl,
        descriptionUa: prod.descriptionUa,
        descriptionPl: prod.descriptionPl,
        usageUa: prod.usageUa,
        usagePl: prod.usagePl,
        ingredients: prod.ingredients,
        images: prod.images,
        isHit: !!prod.isHit,
        isNew: !!prod.isNew,
        isSeason: !!prod.isSeason,
        isActive: prod.isActive !== false,
        categoryId: prod.categoryId,
        subCategoryId: prod.subCategoryId,
      },
    });

    for (const v of prod.variants) {
      await prisma.productVariant.upsert({
        where: { sku: v.sku },
        update: {
          nameUa: v.nameUa,
          namePl: v.namePl,
          price: v.price,
          oldPrice: v.oldPrice,
          stock: v.stock,
          colorCode: v.colorCode,
        },
        create: {
          id: v.id,
          productId: createdProduct.id,
          nameUa: v.nameUa,
          namePl: v.namePl,
          sku: v.sku,
          price: v.price,
          oldPrice: v.oldPrice,
          stock: v.stock,
          colorCode: v.colorCode,
        },
      });
    }
  }

  // 4. Banners
  for (const b of initialBanners) {
    await prisma.banner.upsert({
      where: { id: b.id },
      update: {},
      create: {
        id: b.id,
        titleUa: b.titleUa,
        titlePl: b.titlePl,
        subUa: b.subUa,
        subPl: b.subPl,
        buttonUa: b.buttonUa,
        buttonPl: b.buttonPl,
        link: b.link,
        imageUrl: b.imageUrl,
        isActive: b.isActive,
      },
    });
  }

  console.log("Prisma seed finished successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
