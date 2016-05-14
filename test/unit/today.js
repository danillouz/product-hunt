'use strict';

const chai = require('chai');
const sinon = require('sinon');
const productHunt = require('../../src');
const http = require('../../src/utils/http');

const expect = chai.expect;

describe('.today()', function () {
	before(function () {
		this.httpStub = sinon.stub(http, 'GET', function () {
			return Promise.resolve();
		});

		return productHunt
			.today()
			.exec()
			.then(() => {
				const [ args ] = this.httpStub.args;

				this.params = args[1];
			});
	});

	it('sets `page` query parameter to `0`', function () {
		expect(this.params.page).to.equal(0);
	});

	after(function () {
		this.httpStub.restore();
	});
});
