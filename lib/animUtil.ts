import AnimInterpInfo from "./animInterp.ts";
import type AnimManager from "./animManager.ts";
import type { AnimKeyframe } from "./keyframe.ts";

class AnimUtil<S> {
    private animManager: AnimManager<S>;

    constructor(animManager: AnimManager<S>) {
        this.animManager = animManager;
    }

    /* waits for the time provided in milliseconds */
    public waitTime(timeInMs: number): Promise<void> {
        return this.animManager.waitTime(timeInMs);
    }

    /**
     * Interp using keyframes for a value
     * @param keyframes keyframes for a value, can be created using createKeyframes()
     * @param timeTaken time it takes for the interp to complete in milliseconds
     * @param callbackFn the function that returns the value being interpolated
     * @returns promise that completes when the interp is finished
     */
    public interp(
        keyframes: Array<AnimKeyframe>,
        timeTaken: number,
        callbackFn: (value: number) => void,
    ): Promise<void> {
        return new Promise((resolve) => {
            const animInterp = new AnimInterpInfo(
                keyframes,
                timeTaken,
                callbackFn,
                () => {
                    resolve();
                },
            );
            this.animManager.addInterp(animInterp);
        });
    }

    public setZoomPoint(zoomAmount: number, x: number, y: number) {
        this.animManager.setZoomPoint(zoomAmount, x, y);
    }

    public setState(newState: S) {
        this.animManager.setState(newState);
    }
}

export default AnimUtil;
