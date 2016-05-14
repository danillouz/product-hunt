'use strict';

const chai = require('chai');
const sinon = require('sinon');
const productHunt = require('../../src');
const http = require('../../src/utils/http');

const expect = chai.expect;

describe('.yesterday()', function () {
	before(function () {
		this.httpStub = sinon.stub(http, 'GET', function () {
			return Promise.resolve();
		});

		return productHunt
			.yesterday()
			.exec()
			.then(() => {
				const [ args ] = this.httpStub.args;

				this.params = args[1];
			});
	});

	it('sets `page` query parameter to `1`', function () {
		expect(this.params.page).to.equal(1);
	});

	after(function () {
		this.httpStub.restore();
	});
});
