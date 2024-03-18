"use client";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	return (
		<main className='flex  flex-col items-center  justify-center'>
			<h2 className='text-center'>
				Something went wrong!
				{error.message}
			</h2>
			<button
				className='mt-4 rounded-md bg-sigSurface px-4 py-2 text-sm text-white transition-colors hover:bg-main'
				onClick={
					() => reset()
				}
			>
				Try again
			</button>
		</main>
	);
}
