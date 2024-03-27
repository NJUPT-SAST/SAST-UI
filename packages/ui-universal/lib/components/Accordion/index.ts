import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./index.scss?inline";
import { createComponent } from "@lit/react";
import React from "react";

export interface AccordionProps {
    /**
     * the width of the Accordion
     */
    width?: number;
    /**
     * If `true`, the Accordion will be disabled.
     */
    disabled?: boolean;
}

@customElement("a-accordion")
export class AAccordion extends LitElement {
    static styles = styles;
    @property({ type: Number }) width: AccordionProps["width"] = 280;
    @property({ type: Boolean }) disabled: AccordionProps["disabled"] = false;
    @state() visible: boolean = false;

    render() {
        return html`
            <div
            style=${`width: ${this.width}px`}
            class=${`base ${this.visible ? "show" : ""}`}
            >
            <button
                class=${`accordionTrigger ${this.disabled ? "disabled" : ""}`}
                @click=${() => (this.visible = !this.visible)}
                ?disabled=${this.disabled}
            >
                <div><slot name="title"></slot></div>
                <svg
                width=${15}
                height=${15}
                class=${`icon ${this.visible ? "rotate" : ""}`}
                >
                <path
                    d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                ></path>
                </svg>
            </button>
            <div class="accordionContentWrap">
                <div class=${`inner ${this.visible ? "show" : ""}`}>
                <slot name="content"></slot>
                </div>
            </div>
            <div class="divider"></div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "a-accordion": AAccordion;
    }
}

export const Accordion = createComponent({
    tagName: "a-accordion",
    elementClass: AAccordion,
    react: React,
});
