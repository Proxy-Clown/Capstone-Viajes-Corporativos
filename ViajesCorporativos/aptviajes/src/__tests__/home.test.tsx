import "@testing-library/jest-dom";
import React from "react";
import {render,screen,waitFor} from "@testing-library/react";
import ColaboradorPanel from "@/src/app/home/page"

describe("ColaboradorPanel",()=>{
    beforeEach(()=>{
        jest.clearAllMocks();//limpieza
    });
    it("¿Botones Funcionando?",()=>{
        render(<ColaboradorPanel/>);
        expect(
            screen.getAllByRole("button")
        ).toBeInTheDocument();
    })
})