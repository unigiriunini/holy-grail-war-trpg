import MyFVTTSystemDataModel from "./base-model.mjs";

export default class MyFVTTSystemActorBase extends MyFVTTSystemDataModel {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = {};

    schema.health = new fields.SchemaField({
      value: new fields.NumberField({ ...requiredInteger, initial: 10, min: 0 }),
      max: new fields.NumberField({ ...requiredInteger, initial: 10 })
    });
    schema.power = new fields.SchemaField({
      value: new fields.NumberField({ ...requiredInteger, initial: 5, min: 0 }),
      max: new fields.NumberField({ ...requiredInteger, initial: 5 })
    });
    schema.biography = new fields.StringField({ required: true, blank: true }); // equivalent to passing ({initial: ""}) for StringFields

    schema.appearance = new fields.StringField({ required: true, blank: true });
    schema.note = new fields.StringField({ required: true, blank: true });
    schema.sex = new fields.StringField({ required: true, blank: true });
    schema.law_versus_chaos_alignment = new fields.StringField({ required: true, blank: true });
    schema.good_versus_evil_alignment = new fields.StringField({ required: true, blank: true });
    schema.status = new fields.SchemaField({
        strength: new fields.SchemaField({
            value: new fields.StringField({ required: true, blank: true }),
            plus: new fields.StringField({ required: true, blank: true }),
            ex: new fields.StringField({ required: true, blank: true })
        }),
        constitution: new fields.SchemaField({
            value: new fields.StringField({ required: true, blank: true }),
            plus: new fields.StringField({ required: true, blank: true }),
            ex: new fields.StringField({ required: true, blank: true })
        }),
        dexterity: new fields.SchemaField({
            value: new fields.StringField({ required: true, blank: true }),
            plus: new fields.StringField({ required: true, blank: true }),
            ex: new fields.StringField({ required: true, blank: true })
        }),
        mana: new fields.SchemaField({
            value: new fields.StringField({ required: true, blank: true }),
            plus: new fields.StringField({ required: true, blank: true }),
            ex: new fields.StringField({ required: true, blank: true })
        }),
        luck: new fields.SchemaField({
            value: new fields.StringField({ required: true, blank: true }),
            plus: new fields.StringField({ required: true, blank: true }),
            ex: new fields.StringField({ required: true, blank: true })
        }),
        noble_phantasm: new fields.SchemaField({
            value: new fields.StringField({ required: true, blank: true }),
            plus: new fields.StringField({ required: true, blank: true }),
            ex: new fields.StringField({ required: true, blank: true })
        })
    });

    return schema;
  }

}
