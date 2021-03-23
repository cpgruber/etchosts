#!/usr/bin/env node

const { readFileSync: read, writeFileSync: write } = require('fs');

const HOSTS = '/etc/hosts';

const [,, action, url, ip = '127.0.0.1'] = process.argv;

module.exports = function init () {
  if (action === 'enable') {
    enableHost(url, ip);
  } else if (action === 'disable') {
    disableHost(url);
  } else if (action === 'remove') {
    removeHost(url)
  }
}

function enableHost (url, ip) {
  const hosts = readHosts().filter(line => !isHost(url, line));
  hosts.push(`${ip}       ${url}`);
  writeHosts(hosts);
}

function disableHost (url) {
  const hosts = readHosts().map(line => {
    const prefix = isHost(url, line) && !line.startsWith('#') ? '# ' : '';
    return `${prefix}${line}`;
  });
  writeHosts(hosts);
}

function removeHost (url) {
  const hosts = readHosts().filter(line => !isHost(url, line));
  writeHosts(hosts);
}

function isHost (host, line) {
  return line.endsWith(` ${host}`);
}

function readHosts () {
  const hosts = read(HOSTS, { encoding: 'utf8' });
  return hosts.split('\n');
}

function writeHosts (hosts) {
  return write(HOSTS, hosts.join('\n').replace(/\s*$/, ''));
}