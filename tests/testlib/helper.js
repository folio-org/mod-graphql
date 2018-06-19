import mocha from 'mocha';
import './yakbak';
import './chai';

export * from './runQuery';
// export * from './env';

export const { before, after, beforeEach, afterEach, describe, it } = mocha;

export { default as chai, expect } from 'chai';

export const UUIDregex = /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[1-5][a-fA-F0-9]{3}-[89abAB][a-fA-F0-9]{3}-[a-fA-F0-9]{12}$/;
