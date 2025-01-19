import HolyGrailWarTRPGItemBase from "./base-item.mjs";

export default class HolyGrailWarTRPGLatentMagecraft extends HolyGrailWarTRPGItemBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const schema = super.defineSchema();

    schema.consumed_holy_grail_fragment = new fields.NumberField({ required: true, nullable: false, initial: 0 });
    schema.latent_magecraft_point = new fields.NumberField({ required: true, nullable: false, initial: 0 });
    schema.type = new fields.StringField({ required: true, blank: true });

    schema.triggering_timing = new fields.SchemaField({
      description: new fields.StringField({ required: true, blank: true }),
      consumed_latent_magecraft_point: new fields.NumberField({ required: true, nullable: false, initial: 0 })
    });

    schema.effect = new fields.SchemaField({
      description: new fields.StringField({ required: true, blank: true }),
      consumed_latent_magecraft_point: new fields.NumberField({ required: true, nullable: false, initial: 0 })
    });

    return schema;
  }
}
