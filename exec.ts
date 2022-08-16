#!/usr/bin/env node
/**
 * @fileoverview A meta-TS generation tool which can replace a haphazard and
 * hardcoded code-generation process. 🎩
 */

// This is meant to be executed on the command line.
// $ ./node_modules/.bin/tsc gents.ts
// $ node gents.js /path/to/folder # Compile to JS first!

import { exec } from 'child_process'
import * as fs from 'fs'
import * as path from 'path'

function getAllFilesWithExtension(dir: string = '.', extension: string, files?: string[], curr?: string[]) {
  if (fs.lstatSync(dir).isFile()) {
    return [dir]
  }
  const fileList = files || fs.readdirSync(dir) // Read from workspace
  let result = curr || []
  for (const f of fileList) {
    const filepath = path.join(dir, f)
    try {
      if (fs.statSync(filepath).isDirectory()) {
        result = getAllFilesWithExtension(dir, extension, fs.readdirSync(filepath), result)
      } else if (f.endsWith(extension)) {
        result.push(filepath)
      }
    } catch (e) { /* Cannot handle file */ }
  }
  return result
}

function cmd(command: string) {
  return new Promise((res, rej) => {
    exec(command, (err, stdout, stderr) => {
      if (stdout) {
        console.info('    OK')
        res(1)
        return;
      }
      if (err) {
        console.log(`error: ${err.message}`);
        rej(stderr)
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        rej(stderr)
        return;
      }
      console.info('    OK')
      res(2)
    })
  })
}

// Main
(async () => {
  const gentsFiles = getAllFilesWithExtension(process.argv[2], '.gents')
  for (const gents of gentsFiles) {
    const newFile = gents.replace('.gents', '.ts')
    console.log('Generate', gents, 'as', newFile)
    try {
      await cmd(`node ${gents} > ${newFile}`)
    } catch (e) {
      console.error(e)
    }
  }
})()
