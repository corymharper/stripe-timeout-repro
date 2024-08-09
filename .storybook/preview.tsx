// Imports
import React, { Suspense } from 'react';
import { withScreenshot } from 'storycap';
import { darken } from 'polished';
import { isScreenshot } from 'storycap';


// Force static date
Date.now = () => {
	const dateToModify = new Date();

	dateToModify.setUTCFullYear(2030, 0, 0);
	dateToModify.setUTCHours(0, 0, 0, 0);

	return dateToModify.getTime();
};


// Force Date.toLocaleDateString function to use UTC timezone (instead of user's local timezone), and to not use current date
//  -> This ensures Storybook stories will match screenshots
const toLocaleDateString = Date.prototype.toLocaleDateString;

/* @ts-expect-error */
Date.prototype.toLocaleDateString = function (locales, options) {
	const modifiedOptions = { ...options, timeZone: 'UTC' };

	if (this.toDateString() === new Date().toDateString()) {
		this.setUTCFullYear(2030, 0, 0);
		this.setUTCHours(0, 0);
	}

	return toLocaleDateString.call(this, locales, modifiedOptions);
};


// Force Date.toLocaleTimeString function to use UTC timezone (instead of user's local timezone)
//  -> This ensures Storybook stories will match screenshots
const toLocaleTimeString = Date.prototype.toLocaleTimeString;

/* @ts-expect-error */
Date.prototype.toLocaleTimeString = function (locales, options) {
	const modifiedOptions = { ...options, timeZone: 'UTC' };

	return toLocaleTimeString.call(this, locales, modifiedOptions);
};


// Configure global parameters and decorators
export default {
	parameters: {
		layout: 'fullscreen',
		screenshot: {
			viewports: {
				large: {
					width: 1200,
					height: 1,
					deviceScaleFactor: 2,
				},
				small: {
					width: 375 + 16 * 2,
					height: 1,
					isMobile: true,
					hasTouch: true,
					deviceScaleFactor: 2,
				},
			},
			omitBackground: true,
			fullPage: true,
			captureBeyondViewport: true,
		},
	},
	decorators: [withScreenshot, (storyFn) => (
		<div style={{ padding: '1rem', boxShadow: `inset 0 0 0 1rem #ddd` }}>
			{storyFn()}
		</div>
	)]
};
