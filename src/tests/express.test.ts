import {describe, expect, it, test} from '@jest/globals';
import {root, schema} from '../index'
import {graphql} from 'graphql'

describe('express server route tests', ()=>{
    test('should respond with hello world schema', async ()=>{
        const result : {[key: string]: any} = await graphql({
            schema,
            source: '{hello}',
            rootValue: root,
        })
        expect(result.data.hello).toBe("Hello world!")
    })
    test('should respond with appetizer prices, and names', async()=>{
        const result : {[key: string]: any} = await graphql({
            schema,
            source: `
                {
                    menu{
                      Appetizers{
                        title,
                        price
                      }
                    }
                }`,
            rootValue: root,
        })
        expect(result.data.menu.Appetizers[0].price).toBe(7.5)
        expect(result.data.menu.Appetizers[3].price).toBe(6.95)
        expect(result.data.menu.Appetizers[0].title).toBe("Iceberg Wedge Salad with House Cured Bacon")
        expect(result.data.menu.Appetizers[0].description).toBe(undefined)
    })
})