'use strict';

const chai = require('chai');
const sinon = require('sinon');
const productHunt = require('../../src');
const http = require('../../src/utils/http');

const expect = chai.expect;

describe('.newest()', function () {
	before(function () {
		this.httpStub = sinon.stub(http, 'GET', function () {
			return Promise.resolve();
		});

		return productHunt
			.newest()
			.exec()
			.then(() => {
				const [ args ] = this.httpStub.args;

				this.params = args[1];
			});
	});

	it('sets `filter` query parameter to `newest`', function () {
		expect(this.params.filter).to.equal('newest');
	});

	after(function () {
		this.httpStub.restore();
	});
});
