import {describe, expect, it, test} from '@jest/globals';
import {root} from '../index'

describe('express server route tests', ()=>{
    test('should respond with hello world schema', ()=>{
        expect(root.hello()).toBe("Hello world!")
    })
})