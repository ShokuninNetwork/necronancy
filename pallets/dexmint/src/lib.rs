#![cfg_attr(not(feature = "std"), no_std)]

/// create liquidity pools for both new and extant tokens.
/// simple concentrated liquidity AMM model 
/// - optional custom min price (min), max price (max), and target value ratio (tvr)
/// if not provided, min price == 0, max price == Infinity, and target value ratio == 0.5  
pub use pallet::*;

#[cfg(test)]
mod mock;

#[cfg(test)]
mod tests;

#[cfg(feature = "runtime-benchmarks")]
mod benchmarking;

#[frame_support::pallet]
pub mod pallet {
	use codec::Codec;
	use frame_support::{dispatch::{DispatchResultWithPostInfo, fmt::Debug}, pallet_prelude::*, traits::Currency, StorageMap};
	use frame_system::pallet_prelude::*;
	use sp_runtime::traits::AtLeast32BitUnsigned;

	/// Configure the pallet by specifying the parameters and types on which it depends.
	#[pallet::config]
	pub trait Config: frame_system::Config {
		/// Because this pallet emits events, it depends on the runtime's definition of an event.
		type Event: From<Event<Self>> + IsType<<Self as frame_system::Config>::Event>;
		type NativeCurrency: Currency<Self::AccountId>;
		type Balance: Parameter + Member + AtLeast32BitUnsigned + Codec + Default + Copy +
		MaybeSerializeDeserialize + Debug + MaxEncodedLen;
		type MaxTokensPerAccount: Get<u32>;
		type MaxMetadataSize: Get<u32>;
	}

	#[pallet::pallet]
	#[pallet::generate_store(pub(super) trait Store)]
	pub struct Pallet<T>(_);

	/// key 1: token id, key 2: pool address, key 3: LP address, value: lp share.
	#[pallet::storage]
	#[pallet::getter(fn balance)]
	pub type Shares<T: Config> = StorageNMap<_,(
		NMapKey<Blake2_128Concat, u64>,
		NMapKey<Blake2_128Concat, T::AccountId>,
		NMapKey<Blake2_128Concat, T::AccountId>,
	),
	T::Balance>;

	///get pool address by ID
	#[pallet::storage]
	#[pallet::getter(fn pool)]
	pub type Pools<T: Config> = StorageNMap<_,(
		NMapKey<Blake2_128Concat, u64>,
	),
	T::AccountId>;

	///get related pools by address
	#[pallet::storage]
	#[pallet::getter(fn heldpools)]
	pub type HeldShares<T: Config> = StorageNMap<_,(
		NMapKey<Blake2_128Concat, T::AccountId>,
	),
	BoundedVec<u64, T::MaxTokensPerAccount>>;

	///get pool metadata by id
	#[pallet::storage]
	#[pallet::getter(fn metadata)]
	pub type PoolMetadata<T: Config> = StorageNMap<_,(
		NMapKey<Blake2_128Concat, u64>,
	),
	BoundedVec<u8, T::MaxMetadataSize>>;
	
	#[pallet::storage]
	#[pallet::getter(fn poolnum)]
	pub type PoolCount<T> = StorageValue<_, u64>;

	// Pallets use events to inform users when important changes are made.
	// https://docs.substrate.io/v3/runtime/events-and-errors
	#[pallet::event]
	#[pallet::generate_deposit(pub(super) fn deposit_event)]
	pub enum Event<T: Config> {
		/// Event documentation should end with an array that provides descriptive names for event
		/// parameters. [something, who]
		SomethingStored(u32, T::AccountId),
	}

	// Errors inform users that something went wrong.
	#[pallet::error]
	pub enum Error<T> {
		/// Error names should be descriptive.
		NoneValue,
		/// Errors should have helpful documentation associated with them.
		StorageOverflow,
	}

	#[pallet::hooks]
	impl<T: Config> Hooks<BlockNumberFor<T>> for Pallet<T> {}

	// Dispatchable functions allows users to interact with the pallet and invoke state changes.
	// These functions materialize as "extrinsics", which are often compared to transactions.
	// Dispatchable functions must be annotated with a weight and must return a DispatchResult.
	#[pallet::call]
	impl<T: Config> Pallet<T> {
		
		#[pallet::weight(10_000 + T::DbWeight::get().writes(1))]
		pub fn create_pool(origin: OriginFor<T>, initial_supply: T::Balance) -> DispatchResultWithPostInfo {
			let who = ensure_signed(origin)?;


			Ok(().into())
		}

		#[pallet::weight(10_000 + T::DbWeight::get().writes(1))]
		pub fn add_liquidity(origin: OriginFor<T>, token_id: u64, amount: T::Balance, pool: u64) -> DispatchResultWithPostInfo {
			let who = ensure_signed(origin)?;
			if let Some(from_pool_address) = <Pools<T>>::get((token_id,)){
				if let Some(to_pool_address) = <Pools<T>>::get((pool,)){
					if let Some(own_balance) = <Shares<T>>::get((token_id, from_pool_address.clone(), who.clone())){
						if own_balance < amount {
							// TODO: insufficient balance error
						} else {
							if let Some(dest_balance) = <Shares<T>>::get((token_id, from_pool_address.clone(), to_pool_address.clone())) {
								<Shares<T>>::set((token_id, from_pool_address, to_pool_address.clone()), Some(dest_balance+amount));
							} else {
								<Shares<T>>::set((token_id, from_pool_address, to_pool_address.clone()), Some(amount));
							}
							// TODO: PROPERLY increment destination pool share according to provided value, and not this naive thing
							if let Some(provider_balance) = <Shares<T>>::get((pool, to_pool_address.clone(), who.clone())) {
								<Shares<T>>::set((pool, to_pool_address.clone(), who.clone()), Some(provider_balance+amount));
							} else {
								<Shares<T>>::set((pool, to_pool_address.clone(), who.clone()), Some(amount));
							}
						}
					} else {
						// TODO: no balance error
					}
				} else {
					// TODO: destination pool not extant error
				}
			} else {
				// TODO: source token not extant error
			}
			Ok(().into())
		}

		#[pallet::weight(10_000 + T::DbWeight::get().writes(1))]
		pub fn attempt_transfer(origin: OriginFor<T>, token_id: u64, amount: T::Balance) -> DispatchResultWithPostInfo {
			let who = ensure_signed(origin)?;

			Ok(().into())
		}
	}
}
