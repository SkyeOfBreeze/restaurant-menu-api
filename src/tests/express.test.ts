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
    test("Fajitas display", async()=>{
        const result : {[key: string]: any} = await graphql({
            schema,
            source: `
                {
                    menu{
                      Fajitas{
                        description,
                        items{
                            title,
                            price
                        }
                      }
                    }
                }`,
            rootValue: root,
        })
        expect(result.data.menu.Fajitas.description).toBe("Served with red rice, black beans, grilled tomato salad, choice of corn or flour tortillas")
        expect(result.data.menu.Fajitas.items[0].price).toBe(10.95)
        expect(result.data.menu.Fajitas.items[1].price).toBe(10.95)
        expect(result.data.menu.Fajitas.items[0].title).toBe("Chicken Onions, Poblano and Bell Peppers, Guacamole, Two Salsas")
        expect(result.data.menu.Fajitas.items[1].title).toBe("Sirloin Steak, Onions, Poblano and Bell Peppers, Carrots, Onion, Guacamole, Two Salsas")
    })
})