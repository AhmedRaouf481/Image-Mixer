from processing import counter
from image import *
import matplotlib
import matplotlib.pyplot as plt
matplotlib.use('Agg')


class FFT_Image(Image):

    def __init__(self, image_path, flag=1):
        super().__init__(image_path, flag)

    def fourier_2D(self):
        # calling user defined function to get magnitude and phase of the first image
        self.magnitude, self.angle = self.magnitude_angle()
        self.plot_magnitude_phase(self.magnitude, self.angle)

    def magnitude_angle(self):
        # 2d Fourier transform for the images
        image_fourier = np.fft.fft2(self.image)
        image_fourier = np.fft.fftshift(image_fourier)
        magnitude = np.abs(image_fourier)  # Magnitudes of the fourier sesries
        angle = np.angle(image_fourier)  # Phases of the fourier sesries

        return magnitude, angle

    def plot_magnitude_phase(self, mag, angle):
        phase = np.exp(1j*angle)
        # inverse_mag = np.fft.ifft2(mag)
        # inverse_phase = np.fft.ifft2(phase)
        plt.axis('off')
        plt.imshow(np.abs(np.log(mag)), cmap="gray")
        # plt.margins(x=0, y=-0.25)
        plt.savefig('./files/mag'+str(counter.imgId),
                    bbox_inches='tight', pad_inches=0)
        plt.clf()
        plt.axis('off')
        plt.imshow(np.abs(np.log(phase)), cmap="gray")
        plt.savefig('./files/phase'+str(counter.imgId),
                    bbox_inches='tight', pad_inches=0)
