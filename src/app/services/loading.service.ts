import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';


/**
 * This service handles loading popups. It allows for multiple components to display a single loading message
 */
@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    loading: any;
    pleaseWaitMessage = 'Please Wait';
    numLoading: number;
    isLoading = false;

    constructor(public loadingController: LoadingController) {
        console.log('Loading service created');
        this.numLoading = 0;
        this.loading = null;
    }

    wait() {
        this.numLoading++;
        //console.log('num waiting', this.numLoading);
        if (!this.isLoading) {
            this.isLoading = true;
            this.present();

        }
    }

    ready() {
        if (this.numLoading === 1) {
            this.numLoading = 0;
            this.close();
        } else {
            this.numLoading--;
        }

        //console.log('num waiting', this.numLoading);
    }

    close() {
        // Prevents the dialog from being dismissed only to be immediately presented again
        setTimeout(() => {
            if (this.numLoading === 0 && this.loading) {
                this.isLoading = false;
                this.loading.dismiss();
                console.log('DISMISSED');
            } else {
                console.log('NOT DISMISSED');
            }
        }, 1000);
    }

    async present() {
        console.log('PRESENTED');
        this.loading = await this.loadingController.create({
            message: this.pleaseWaitMessage + '...'
        });
        await this.loading.present();
    }
}
