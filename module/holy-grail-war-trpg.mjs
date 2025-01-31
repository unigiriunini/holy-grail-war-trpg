// Import document classes.
import { HolyGrailWarTRPGActor } from './documents/actor.mjs';
import { HolyGrailWarTRPGItem } from './documents/item.mjs';
// Import sheet classes.
import { HolyGrailWarTRPGActorSheet } from './sheets/actor-sheet.mjs';
import { HolyGrailWarTRPGItemSheet } from './sheets/item-sheet.mjs';
// Import helper/utility classes and constants.
import { preloadHandlebarsTemplates } from './helpers/templates.mjs';
import { HOLY_GRAIL_WAR_TRPG } from './helpers/config.mjs';
// Import DataModel classes
import * as models from './data/_module.mjs';

/* -------------------------------------------- */
/*  Init Hook                                   */
/* -------------------------------------------- */

Hooks.once('init', function () {
  // Add utility classes to the global game object so that they're more easily
  // accessible in global contexts.
  game.holygrailwartrpg = {
    HolyGrailWarTRPGActor,
    HolyGrailWarTRPGItem,
    rollItemMacro,
  };

  // Add custom constants for configuration.
  CONFIG.HOLY_GRAIL_WAR_TRPG = HOLY_GRAIL_WAR_TRPG;

  /**
   * Set an initiative formula for the system
   * @type {String}
   */
  CONFIG.Combat.initiative = {
    formula: '1d20 + @abilities.dex.mod',
    decimals: 2,
  };

  // Define custom Document and DataModel classes
  CONFIG.Actor.documentClass = HolyGrailWarTRPGActor;

  // Note that you don't need to declare a DataModel
  // for the base actor/item classes - they are included
  // with the Character/NPC as part of super.defineSchema()
  CONFIG.Actor.dataModels = {
    character: models.HolyGrailWarTRPGCharacter,
    npc: models.HolyGrailWarTRPGNPC,
    master: models.HolyGrailWarTRPGMaster,
    servant: models.HolyGrailWarTRPGServant
  }
  CONFIG.Item.documentClass = HolyGrailWarTRPGItem;
  CONFIG.Item.dataModels = {
    fame: models.HolyGrailWarTRPGFame,
    roots: models.HolyGrailWarTRPGRoots,
    constraint: models.HolyGrailWarTRPGConstraint,
    holyGrailFragment: models.HolyGrailWarTRPGHolyGrailFragment,
    latentMagecraft: models.HolyGrailWarTRPGLatentMagecraft,
    servantClass: models.HolyGrailWarTRPGServantClass,
    weakness: models.HolyGrailWarTRPGWeakness,
    item: models.HolyGrailWarTRPGItem,
    feature: models.HolyGrailWarTRPGFeature,
    spell: models.HolyGrailWarTRPGSpell
  }

  // Active Effects are never copied to the Actor,
  // but will still apply to the Actor from within the Item
  // if the transfer property on the Active Effect is true.
  CONFIG.ActiveEffect.legacyTransferral = false;

  // Register sheet application classes
  Actors.unregisterSheet('core', ActorSheet);
  Actors.registerSheet('holy-grail-war-trpg', HolyGrailWarTRPGActorSheet, {
    makeDefault: true,
    label: 'HOLY_GRAIL_WAR_TRPG.SheetLabels.Actor',
  });
  Items.unregisterSheet('core', ItemSheet);
  Items.registerSheet('holy-grail-war-trpg', HolyGrailWarTRPGItemSheet, {
    makeDefault: true,
    label: 'HOLY_GRAIL_WAR_TRPG.SheetLabels.Item',
  });

  // Preload Handlebars templates.
  return preloadHandlebarsTemplates();
});

/* -------------------------------------------- */
/*  Handlebars Helpers                          */
/* -------------------------------------------- */

// If you need to add Handlebars helpers, here is a useful example:
Handlebars.registerHelper('toLowerCase', function (str) {
  return str.toLowerCase();
});

/* -------------------------------------------- */
/*  Ready Hook                                  */
/* -------------------------------------------- */

Hooks.once('ready', function () {
  // Wait to register hotbar drop hook on ready so that modules could register earlier if they want to
  Hooks.on('hotbarDrop', (bar, data, slot) => createItemMacro(data, slot));
});

/* -------------------------------------------- */
/*  Hotbar Macros                               */
/* -------------------------------------------- */

/**
 * Create a Macro from an Item drop.
 * Get an existing item macro if one exists, otherwise create a new one.
 * @param {Object} data     The dropped data
 * @param {number} slot     The hotbar slot to use
 * @returns {Promise}
 */
async function createItemMacro(data, slot) {
  // First, determine if this is a valid owned item.
  if (data.type !== 'Item') return;
  if (!data.uuid.includes('Actor.') && !data.uuid.includes('Token.')) {
    return ui.notifications.warn(
      'You can only create macro buttons for owned Items'
    );
  }
  // If it is, retrieve it based on the uuid.
  const item = await Item.fromDropData(data);

  // Create the macro command using the uuid.
  const command = `game.holygrailwartrpg.rollItemMacro("${data.uuid}");`;
  let macro = game.macros.find(
    (m) => m.name === item.name && m.command === command
  );
  if (!macro) {
    macro = await Macro.create({
      name: item.name,
      type: 'script',
      img: item.img,
      command: command,
      flags: { 'holy-grail-war-trpg.itemMacro': true },
    });
  }
  game.user.assignHotbarMacro(macro, slot);
  return false;
}

/**
 * Create a Macro from an Item drop.
 * Get an existing item macro if one exists, otherwise create a new one.
 * @param {string} itemUuid
 */
function rollItemMacro(itemUuid) {
  // Reconstruct the drop data so that we can load the item.
  const dropData = {
    type: 'Item',
    uuid: itemUuid,
  };
  // Load the item from the uuid.
  Item.fromDropData(dropData).then((item) => {
    // Determine if the item loaded and if it's an owned item.
    if (!item || !item.parent) {
      const itemName = item?.name ?? itemUuid;
      return ui.notifications.warn(
        `Could not find item ${itemName}. You may need to delete and recreate this macro.`
      );
    }

    // Trigger the item roll
    item.roll();
  });
}
