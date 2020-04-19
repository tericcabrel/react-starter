import * as fs from 'fs';
import { Translate } from '@google-cloud/translate';

import { capitalize } from '../utils/helpers';

require('dotenv').config();

/**
 * This class is an utility to translate words from the default locale of the project
 * to the others available locales
 * It takes an object containing a key-value pair of word to translate and return
 * an object where the value of each keys has been translated to each locales provided in an array
 *
 * @class
 * @constructor
 *
 * @property {boolean} translateAll=false - Indicates if we don't want to check if a key has been alrealdy translated.
 * @property {string} translationDir - Path of the translations directory.
 * @property {string} manifestFile - Path of the manifest file. When a key is translated, it's saved here.
 * @property {LocaleMessageItem} manifest - Represents the content of the manifestFile as an object.
 * @property {string} localeDir - Path of the directory containing the locale files.
 * @property {string[]} availableLocales - The author of the book.
 * @property {string} defaultLocale - The author of the book.
 * @property {LocaleMessage} localeMessages - The author of the book.
 * @property {LocaleMessageItem} defaultLocalMessage - The author of the book.
 * @property {string[]} translationKeys - The author of the book.
 * @property {boolean} isKeyProvidedByUser - The author of the book.
 */
class LocaleTranslator {
  /** @private */
  private translateAll: boolean;

  /**
   * @private
   * @readonly
   */
  private readonly translationDir: string;

  /**
   * @private
   * @readonly
   */
  private readonly manifestFile: string;

  /** @private */
  private manifest: LocaleMessageItem;

  /**
   * @private
   * @readonly
   */
  private readonly localeDir: string;

  /**
   * @private
   * @readonly
   */
  private readonly availableLocales: string[];

  /**
   * @private
   * @readonly
   */
  private readonly defaultLocale: string;

  /** @private */
  private localeMessages: LocaleMessage;

  /** @private */
  private defaultLocalMessage: LocaleMessageItem;

  /** @private */
  private translationKeys: string[];

  /** @private */
  private isKeyProvidedByUser: boolean;

  /**
   * @private
   * @readonly
   */
  private readonly translationInfo: LocaleTranslationInfo;

  /**
   * @private
   * @readonly
   */
  private readonly translator: Translate;

  constructor() {
    this.translateAll = false;
    this.translationDir = './src/translations';
    this.manifestFile = `${this.translationDir}/translation.manifest.json`;
    this.manifest = {};
    this.localeDir = `${this.translationDir}/locales`;

    // Set available languages
    this.availableLocales = ['en', 'fr', 'de', 'es'];

    this.defaultLocale = this.availableLocales[0];

    this.localeMessages = { };

    this.defaultLocalMessage = { };

    this.translationKeys = [];

    this.isKeyProvidedByUser = false;

    this.translationInfo = {
      toTranslate: 0,
      translated: 0,
      alreadyTranslated: 0,
      processed: 0
    };

    this.translator = new Translate({
      projectId: process.env.REACT_APP_GCP_API_KEY
    });

    this.init();
  }

  /**
   * Get Translator object
   *
   * @function
   * @public
   * @return Translate
   */
  public getTranslator(): Translate {
    return this.translator;
  }

  /**
   * Initialize the properties
   *
   * @function
   * @private
   * @return void
   */
  private init(): void {
    this.getManifest();

    this.getTranslationContentForAllLocale();

    this.parseProcessArgument();
  }

  /**
   * Get user's information stored in the Localstorage
   *
   * @function
   * @private
   * @return void
   */
  private parseProcessArgument(): void {
    const localeArguments: string[] = process.argv.slice(2);

    this.translateAll = localeArguments.indexOf('--all') >= 0;

    const keyParamIndex: number = localeArguments.findIndex((arg: string): boolean => arg.includes('--keys='));

    if (keyParamIndex >= 0) {
      const split: string[] = localeArguments[keyParamIndex].split('=');

      if (split.length === 2) {
        if (split[0] !== '--keys') {
          throw new Error(`Unrecognized parameter ${split[0]}!`);
        }
        this.translationKeys = split[1].split(',');

        // If we provide some keys to translate, it can't be all
        this.translateAll = false;
        this.isKeyProvidedByUser = true;
      } else {
        throw new Error(`Invalid value [${split[1]}] for the parameter ${split[0]} provided!`);
      }
    } else {
      this.translationKeys = Object.keys(this.defaultLocalMessage);
    }

    this.translationInfo.toTranslate = this.translationKeys.length;
  }

  /**
   * Get the content of the manifestFile
   *
   * @function
   * @private
   * @return void
   */
  private getManifest(): void {
    if (!fs.existsSync(this.manifestFile)) {
      fs.writeFileSync(this.manifestFile, '{}', { encoding: 'utf8' });
    }

    const manifestContent: string = fs.readFileSync(this.manifestFile).toString();

    this.manifest = Object.assign({}, {}, { ...(JSON.parse(manifestContent)) });
  }

  /**
   * Get the content of all available locales and store it in an object
   *
   * @function
   * @private
   * @return void
   */
  private getTranslationContentForAllLocale(): void {
    // Read translation file for each locale
    this.availableLocales.forEach((locale: string): void => {
      const content: string = fs.readFileSync(`${this.localeDir}/${locale}.json`).toString();

      this.localeMessages = Object.assign({}, this.localeMessages, {
        [locale]: JSON.parse(content)
      });
    });

    this.defaultLocalMessage = this.localeMessages[this.defaultLocale];
  }

  /**
   * Check into the manifest file the word associated to the key provided
   * to know if we need to translate it or not
   *
   * @function
   * @private
   * @return boolean
   */
  canTranslate(localeKey: string): boolean {
    let canTranslate: boolean = true;

    if (!this.translateAll) {
      const translationExist: string | undefined = this.manifest[localeKey];
      const boolValue: boolean = translationExist !== this.defaultLocalMessage[localeKey];

      if (this.isKeyProvidedByUser) {
        if (!translationExist) {
          console.log('Unknown translation key: %s', localeKey);
          canTranslate = false;
        } else {
          if (!boolValue) {
            this.translationInfo.alreadyTranslated += 1;
          }
          canTranslate = boolValue;
        }
      } else {
        if (!boolValue) {
          this.translationInfo.alreadyTranslated += 1;
          canTranslate = false;
        }
      }
    }

    return canTranslate;
  }

  /**
   * Loop in the array containing the keys to translate and translate it
   * for each available locales
   *
   * @async
   * @function
   * @private
   * @return Promise<void>
   */
  private async translateItems(): Promise<void> {
    const availableLocalesLength: number = this.availableLocales.length;
    const textsToTranslated: LocaleMessageItem[] = [];

    // Loop on each key and check if it's already translated otherwise just put
    for (const localeItemKey of this.translationKeys) {
      const canTranslate: boolean = this.canTranslate(localeItemKey);

      if (canTranslate) {
        const localItemValue: string = this.defaultLocalMessage[localeItemKey];

        textsToTranslated.push({
          [localeItemKey]: localItemValue
        });
        this.translationInfo.translated += 1;
      }

      this.translationInfo.processed += 1;
    }

    if (textsToTranslated.length > 0) {
      const texts: string[] = textsToTranslated.map((obj: LocaleMessageItem): string => Object.values(obj)[0]);
      const textKeys: string[] = textsToTranslated.map((obj: LocaleMessageItem): string => Object.keys(obj)[0]);

      for (let i: number = 1; i < availableLocalesLength; i += 1) {
        // TODO Find the right type for response
        const response: any = await this.translator.translate(
          texts, {
            from: this.defaultLocale,
            to: this.availableLocales[i]
          });

        let [translations]: any = response;

        translations = Array.isArray(translations) ? translations : [translations];

        translations.forEach((translation: string, index: number): void => {
          const localeItemKey: string = textKeys[index];

          this.localeMessages[this.availableLocales[i]] = {
            ...this.localeMessages[this.availableLocales[i]],
            [localeItemKey]: capitalize(translation)
          };
          this.manifest = Object.assign({}, this.manifest, {
            [localeItemKey]: this.defaultLocalMessage[localeItemKey]
          });
        });
      }

      console.log('Translate %d items', textsToTranslated.length);
    } else {
      console.log('Nothing to translate !');
    }
  }

  /**
   * Writes the updated (translated) content in the locale file for the corresponding language
   *
   * @function
   * @private
   * @return void
   */
  private updateTranslationFile(): void {
    const availableLocalesLength: number = this.availableLocales.length;

    fs.writeFileSync(this.manifestFile, JSON.stringify(this.manifest), { encoding: 'utf8' });
    for (let i: number = 1; i < availableLocalesLength; i += 1) {
      fs.writeFileSync(
        `${this.localeDir}/${this.availableLocales[i]}.json`,
        JSON.stringify(this.localeMessages[this.availableLocales[i]], null, 2),
        { encoding: 'utf8' }
      );
    }
  }

  /**
   * Translates keys in the default locale's file to others available locale
   *
   * @async
   * @function
   * @public
   * @return Promise<void>
   */
  public async translate(): Promise<void> {
    try {
      await this.translateItems();

      this.updateTranslationFile();

      const { toTranslate, processed, translated, alreadyTranslated }: LocaleTranslationInfo = this.translationInfo;

      console.log(`\nItems analyzed : ${processed} / ${toTranslate}`);
      console.log(`Items translated : ${translated}`);
      console.log(`Items already translated : ${alreadyTranslated}`);
    } catch (e) {
      console.log(e);
    }
  }
}

// Execute the translation
(async (): Promise<void> => {
  const translator: LocaleTranslator = new LocaleTranslator();

  await translator.translate();
})();

type LocaleMessageItem = {
  [prop: string]: string
};

type LocaleMessage = {
  [key: string]: LocaleMessageItem
};

type TranslationResponse = {
  text: string,
  from: {
    language: {
      didYouMean: boolean,
      iso: string
    },
    text: {
      autoCorrected: boolean,
      value: string,
      didYouMean: boolean
    }
  },
  raw: string
};

type LocaleTranslationInfo = {
  processed: number,
  toTranslate: number,
  translated: number,
  alreadyTranslated: number,
};
