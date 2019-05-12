import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';
import React from 'react';
import ProfilePage from '../Pages/ProfilePage';
import {render} from 'react-testing-library'
const puppeteer = require('puppeteer');

test("login successfully", async()=>{
  const browser = await puppeteer.launch({
        headless: false,
        slowMo: 80,
        args: ['--window-size=1920,1080']
      });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/my-account');
  await page.click("button.profile-back-button");
  await page.url('http://localhost:3000/room-list');
  browser.close();
});

test("login successfully", async()=>{
    const browser = await puppeteer.launch({
          headless: false,
          slowMo: 80,
          args: ['--window-size=1920,1080']
        });
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/my-account');
    await page.click("button.Game-rule-button");
    await page.url('http://localhost:3000/game-rule');
    browser.close();
  });

  test("login successfully", async()=>{
    const browser = await puppeteer.launch({
          headless: false,
          slowMo: 80,
          args: ['--window-size=1920,1080']
        });
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/my-account');
    await page.click("button.Profile-button");
    await page.url('http://localhost:3000/my-account');
    browser.close();
  });