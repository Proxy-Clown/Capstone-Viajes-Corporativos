import "@testing-library/jest-dom"
import React from "react"
import {render,screen} from "@testing-library/react"
import NeoTravelFlowLogin from "../app/login/page"

//TEST DE PRUEBA
jest.mock("next/navigation",()=>({
    useRouter:()=>({
        push:jest.fn(),
        replace:jest.fn(),
        prefetch:jest.fn(),
    }),
}));

describe('page', ()=>{
    it('renders input',()=>{
        render(<NeoTravelFlowLogin/>)
        const waos = screen.getByRole('heading',{level:1})
        expect(waos).toBeInTheDocument()
    })
})