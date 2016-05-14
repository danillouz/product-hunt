'use strict';

const chai = require('chai');
const sinon = require('sinon');
const productHunt = require('../../src');
const http = require('../../src/utils/http');

const expect = chai.expect;

describe('.popular()', function () {
	before(function () {
		this.httpStub = sinon.stub(http, 'GET', function () {
			return Promise.resolve();
		});

		return productHunt
			.popular()
			.exec()
			.then(() => {
				const [ args ] = this.httpStub.args;

				this.params = args[1];
			});
	});

	it('sets `filter` query parameter to `popular`', function () {
		expect(this.params.filter).to.equal('popular');
	});

	after(function () {
		this.httpStub.restore();
	});
});
