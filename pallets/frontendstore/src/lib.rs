#![cfg_attr(not(feature = "std"), no_std)]


/// Simple pallet to allow storage of simple frontend code onchain to enable decentralized frontends
/// have access to the chain should == access to a frontend
pub use pallet::*;

#[cfg(test)]
mod mock;

#[cfg(test)]
mod tests;

#[cfg(feature = "runtime-benchmarks")]
mod benchmarking;

#[frame_support::pallet]
pub mod pallet {
	use frame_support::{dispatch::DispatchResultWithPostInfo, pallet_prelude::*, inherent::Vec};
	use frame_system::pallet_prelude::*;

	/// Configure the pallet by specifying the parameters and types on which it depends.
	#[pallet::config]
	pub trait Config: frame_system::Config {
		/// Because this pallet emits events, it depends on the runtime's definition of an event.
		type Event: From<Event<Self>> + IsType<<Self as frame_system::Config>::Event>;
	}

	#[pallet::pallet]
	#[pallet::generate_store(pub(super) trait Store)]
	pub struct Pallet<T>(_);

	// Pallets use events to inform users when important changes are made.
	// https://docs.substrate.io/v3/runtime/events-and-errors
	#[pallet::event]
	#[pallet::generate_deposit(pub(super) fn deposit_event)]
	pub enum Event<T: Config> {
		/// Event documentation should end with an array that provides descriptive names for event
		/// parameters. [something, who]
		ExtraCodeUpdated,
	}

	#[pallet::hooks]
	impl<T: Config> Hooks<BlockNumberFor<T>> for Pallet<T> {}

	#[pallet::call]
	impl<T: Config> Pallet<T> {
		/// auxillary storage for arbitrary data, only callable by the root origin.
		#[pallet::weight((T::BlockWeights::get().max_block, DispatchClass::Operational))]
		pub fn update_extra_code(origin: OriginFor<T>, something: Vec<u8>) -> DispatchResultWithPostInfo {
			ensure_root(origin)?;

			storage::unhashed::put_raw(b":extracode", &something);

			// Emit an event.
			Self::deposit_event(Event::ExtraCodeUpdated);
			// Return a successful DispatchResultWithPostInfo
			Ok(().into())
		}
	}
}
